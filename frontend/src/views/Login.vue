<template>
  <div class="login-container">
    <div class="login-box">
      <h1>Bienvenido a EscuelaViva</h1>
      <form @submit.prevent="handleLogin">
        <input 
          v-model="email" 
          type="email" 
          placeholder="Correo" 
          required 
        />
        <input 
          v-model="password" 
          type="password" 
          placeholder="Contraseña" 
          required 
        />
        <button type="submit" :disabled="isLoading">
          {{ isLoading ? 'Cargando...' : 'Ingresar' }}
        </button>
      </form>
      <p v-if="errorMessage" class="error-msg">{{ errorMessage }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/store/auth';

const email = ref('');
const password = ref('');
const isLoading = ref(false);
const errorMessage = ref('');

const router = useRouter();
const authStore = useAuthStore();

const handleLogin = async () => {
  isLoading.value = true;
  errorMessage.value = '';

  const result = await authStore.login(email.value, password.value);

  if (result.success) {
    router.push('/dashboard');
  } else {
    // Manejo de errores (como el 401 Unauthorized que vimos en tu consola)
    errorMessage.value = 'Credenciales inválidas';
  }
  
  isLoading.value = false;
};
</script>

<style lang="scss" scoped>
@use "sass:color";

.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  width: 100vw;
  // Degradado original de tu informe técnico
  background: linear-gradient(135deg, #1A1A2E, #16213E);
  color: white;
  margin: 0;
  padding: 0;
  position: absolute;
  top: 0;
  left: 0;

  .login-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 400px;
    padding: 2rem;
  }

  h1 {
    font-size: 2rem;
    margin-bottom: 2rem;
    font-family: sans-serif;
  }

  form {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 300px;

    input {
      padding: 0.75rem;
      margin-bottom: 1rem;
      border: none;
      border-radius: 6px;
      outline: none;
      color: #333;
      font-size: 1rem;
    }

    button {
      padding: 0.75rem;
      background: #FF9F1C;
      color: white;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-weight: bold;
      font-size: 1rem;
      transition: background 0.3s ease;

      &:hover:not(:disabled) {
        background: color.adjust(#FF9F1C, $lightness: -10%);
      }

      &:disabled {
        background: #555;
        cursor: not-allowed;
      }
    }
  }

  .error-msg {
    color: #FF4D4D;
    margin-top: 1.5rem;
    font-weight: bold;
    background: rgba(255, 77, 77, 0.1);
    padding: 0.5rem 1rem;
    border-radius: 4px;
  }
}
</style>