import { defineStore } from "pinia";
import api from "@/api/axios";
import { ROL_DOCENTE, type Role } from "@/constants/roles";

const ROLE_KEY = "userRole";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: localStorage.getItem("token") || null,
    user: null as unknown,
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
  actions: {
    async login(email: string, password: string) {
      try {
        const response = await api.post("/auth/login", { email, password });
        const { access_token, role } = response.data as {
          access_token: string;
          role?: Role;
        };

        this.token = access_token;
        localStorage.setItem("token", access_token);

        const userRole = role ?? ROL_DOCENTE;
        localStorage.setItem(ROLE_KEY, userRole);

        return { success: true };
      } catch (error: unknown) {
        const err = error as { response?: { data?: { message?: string } }; message?: string };
        console.error("Error login:", err.response?.data || err.message);
        return {
          success: false,
          message: err.response?.data?.message ?? "Error de conexión",
        };
      }
    },
    logout() {
      this.token = null;
      this.user = null;
      localStorage.removeItem("token");
      localStorage.removeItem(ROLE_KEY);
    },
  },
});