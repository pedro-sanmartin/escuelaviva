/**
 * Tipos de usuario y perfil.
 * Preparado para integración con backend (JWT, API de perfil).
 */

/** Datos de bienvenida mostrados en el dashboard (resumen del día, rol, etc.) */
export interface WelcomeState {
  userName: string;
  role: string;
  summary: string;
  ctaLabel: string;
  imageUrl: string;
}
