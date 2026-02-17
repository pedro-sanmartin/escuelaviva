import { defineStore } from 'pinia';
import api from '@/api/axios'; // Importamos el axios que configuraste

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || null,
    user: null,
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
  actions: {
    async login(email: string, password: string) {
      try {
        // Hacemos la petición al endpoint de tu backend
        const response = await api.post('/auth/login', { email, password });
        
        // Según tu informe, el backend devuelve { access_token: "..." }
        const { access_token } = response.data;

        this.token = access_token;
        localStorage.setItem('token', access_token);

        return { success: true };
      } catch (error: any) {
        console.error('Error login:', error.response?.data || error.message);
        return { 
          success: false, 
          message: error.response?.data?.message || 'Error de conexión' 
        };
      }
    },
    logout() {
        this.token = null;
        this.user = null;
        localStorage.removeItem('token'); // 🗑️ Limpia el token para que el Guard actúe
      }
  }
});