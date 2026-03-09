/**
 * Plugin PrimeVue para EscuelaViva.
 * Tema, Tooltip y configuración base. Soporte PWA y multiplataforma.
 */
import PrimeVue from "primevue/config";
import Tooltip from "primevue/tooltip";
import type { App } from "vue";
import { EscuelaVivaPreset } from "@/styles/theme";
import "primeicons/primeicons.css";

export function installPrimeVue(app: App) {
  app.directive("tooltip", Tooltip);
  app.use(PrimeVue, {
    theme: {
      preset: EscuelaVivaPreset,
      options: {
        prefix: "p",
        darkModeSelector: "system",
        cssLayer: {
          name: "primevue",
          order: "theme, base, primevue",
        },
      },
    },
  });
}
