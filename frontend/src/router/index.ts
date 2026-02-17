import { createRouter, createWebHistory } from 'vue-router';
import Login from '@/views/Login.vue';
import Dashboard from '@/views/Dashboard.vue'; // Asegúrate de que el nombre coincida

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
    meta: { requiresAuth: false }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: { requiresAuth: true } // 🔒 Marcamos esta ruta como protegida
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// Guardia de navegación
router.beforeEach((to, _from, next) => {
  const token = localStorage.getItem('token');
  const isAuthRequired = to.matched.some(record => record.meta.requiresAuth);

  if (isAuthRequired && !token) {
    // Si la ruta requiere auth y no hay token, al login
    next({ name: 'Login' });
  } else if (to.name === 'Login' && token) {
    // Si ya está logueado e intenta ir al login, al dashboard
    next({ name: 'Dashboard' });
  } else {
    next();
  }
});

export default router;