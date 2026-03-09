/**
 * Configuración centralizada de la aplicación.
 * URLs de API, constantes de entorno y opciones DUA (tamaños de fuente).
 * Soporta PWA, GraphQL y múltiples plataformas (Capacitor/Electron).
 */

/**
 * URLs y endpoints.
 * En build: usar variables de entorno (VITE_*).
 */
export const appConfig = {
  /** API REST (auth, etc.) */
  apiBaseUrl: import.meta.env.VITE_API_URL ?? "http://localhost:3000",
  /** GraphQL endpoint (cuando Apollo esté activo) */
  graphqlUri: import.meta.env.VITE_GRAPHQL_URI ?? "http://localhost:3000/graphql",
  /** Modo desarrollo */
  isDev: import.meta.env.DEV,
  /** Modo producción */
  isProd: import.meta.env.PROD,
} as const;

/**
 * Niveles de tamaño de fuente según DUA (Documento Técnico EscuelaViva).
 * Tres niveles para inclusión y accesibilidad.
 */
export const FONT_SIZE_DUA = {
  /** Nivel reducido (compacto) */
  small: "0.875rem",
  /** Nivel estándar */
  medium: "1rem",
  /** Nivel ampliado (lectura más cómoda) */
  large: "1.125rem",
} as const;

export type FontSizeDuaLevel = keyof typeof FONT_SIZE_DUA;

/**
 * Clase CSS aplicable al root para escalar fuentes según preferencia DUA.
 * Uso: document.documentElement.classList.add('dua-font-large')
 */
export const DUA_FONT_CLASS = {
  small: "dua-font-small",
  medium: "dua-font-medium",
  large: "dua-font-large",
} as const;

/** Tema visual (claro/oscuro). Alineado con PrimeVue y Tailwind. */
export const THEME_MODE = {
  light: "light",
  dark: "dark",
} as const;

export type ThemeMode = (typeof THEME_MODE)[keyof typeof THEME_MODE];

/** Clase aplicada a <html> para tema oscuro (Tailwind/PrimeVue) */
export const THEME_DARK_CLASS = "dark";
