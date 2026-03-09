/**
 * Store de usuario y perfil.
 * Gestiona datos de bienvenida, preferencias y perfil.
 * Preparado para alimentarse desde API/JWT en producción.
 */
import { defineStore } from "pinia";
import type { WelcomeState } from "@/types";

const DEFAULT_WELCOME: WelcomeState = {
  userName: "Pedro",
  role: "Docente Senior",
  summary:
    "Tu ecosistema educativo está listo para el día de hoy.\nTienes 4 clases programadas, 2 reportes PIE pendientes y 1 reunión de coordinación.",
  ctaLabel: "Explorar Recursos",
  imageUrl:
    "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=400&q=80&auto=format&fit=crop",
};

export const useUserStore = defineStore("user", {
  state: () => ({
    welcome: { ...DEFAULT_WELCOME } as WelcomeState,
  }),
  actions: {
    /** Actualiza los datos de bienvenida (p. ej. desde API de perfil) */
    setWelcome(data: Partial<WelcomeState>) {
      this.welcome = { ...this.welcome, ...data };
    },
  },
});
