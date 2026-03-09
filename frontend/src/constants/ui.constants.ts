/**
 * Constantes de UI: urgencia de alertas, categorías de recursos, etc.
 * Preparado para inclusión técnica (accesibilidad, i18n, theming).
 */

/** Niveles de urgencia para alertas Panel PIE */
export const ALERT_URGENCY = {
  URGENTE: "urgente",
  PENDIENTE: "pendiente",
  INFO: "info",
} as const;

export type AlertUrgency = (typeof ALERT_URGENCY)[keyof typeof ALERT_URGENCY];

/** Categorías de recursos (para filtros y estilos) */
export const RECURSO_CATEGORIA = {
  PDF: "pdf",
  DOCUMENTO: "documento",
  VIDEO: "video",
  ENLACE: "enlace",
} as const;

export type RecursoCategoria = (typeof RECURSO_CATEGORIA)[keyof typeof RECURSO_CATEGORIA];

/** Latencia simulada para Mock de Red (ms). Preparado para modo offline. */
export const MOCK_NETWORK_LATENCY_MS = 600;
