import { createRouter, createWebHistory } from "vue-router";
import { createAuthGuard } from "@/auth/auth.guard";
import { ROUTE_ROLES } from "@/auth/auth.guard";
import Login from "@/views/Login.vue";
import MainLayout from "@/layouts/MainLayout.vue";
import DashboardView from "@/views/dashboard/DashboardView.vue";

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
    meta: { requiresAuth: false },
  },
  {
    path: "/dashboard",
    component: MainLayout,
    name: "Dashboard",
    meta: {
      requiresAuth: true,
      allowedRoles: [ROUTE_ROLES.DOCENTE, ROUTE_ROLES.PIE, ROUTE_ROLES.ESTUDIANTE],
    },
    children: [
      {
        path: "",
        name: "DashboardHome",
        component: DashboardView,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(createAuthGuard);

export default router;
