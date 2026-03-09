/**
 * Roles del sistema EscuelaViva.
 * Alineado con el Documento Técnico de Arquitectura v1.0.
 */

export const ROL_ESTUDIANTE = "ESTUDIANTE";
export const ROL_DOCENTE = "DOCENTE";
export const ROL_PIE = "PIE";
export const ROL_DIRECTIVO = "DIRECTIVO";
export const ROL_APODERADO = "APODERADO";

export const ROLES = [
  ROL_ESTUDIANTE,
  ROL_DOCENTE,
  ROL_PIE,
  ROL_DIRECTIVO,
  ROL_APODERADO,
] as const;

export type Role = (typeof ROLES)[number];
