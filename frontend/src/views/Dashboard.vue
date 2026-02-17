<template>
  <div class="dashboard-container">
    <h1>Dashboard</h1>
    <p>Bienvenido a EscuelaViva.</p>
    
    <button @click="handleLogout" class="logout-btn">Cerrar Sesión</button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/store/auth';

const router = useRouter();
const authStore = useAuthStore();

const handleLogout = () => {
  authStore.logout(); // Limpia el token
  router.push('/');   // Redirige al Login
};
</script>

<style scoped>
.dashboard-container {
  padding: 2rem;
  font-family: sans-serif;
}

.logout-btn {
  margin-top: 2rem;
  padding: 0.5rem 1rem;
  background-color: #ff4d4d;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
}

.logout-btn:hover {
  background-color: #cc0000;
}
</style>