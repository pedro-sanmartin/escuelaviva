/**
 * Registro centralizado de plugins.
 * Mantiene main.ts limpio y facilita pruebas y multiplataforma.
 */
import type { App } from "vue";
import { installPrimeVue } from "./primevue";
import { installFontAwesome } from "./fontawesome";

export function registerPlugins(app: App) {
  installFontAwesome(app);
  installPrimeVue(app);
}

export { createApolloClient } from "./apollo";
