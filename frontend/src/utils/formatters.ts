/**
 * Formateadores de fechas y textos según DUA (Diseño Universal para el Aprendizaje).
 * EscuelaViva - Documento Técnico: inclusión y claridad en presentación de datos.
 */

const LOCALE_DEFAULT = "es-CL";

/**
 * Formatea una fecha para mostrar de forma legible (locale español Chile).
 */
export function formatDate(date: Date | string | number, options?: Intl.DateTimeFormatOptions): string {
  const d = typeof date === "object" && "getTime" in date ? date : new Date(date);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString(LOCALE_DEFAULT, {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    ...options,
  });
}

/**
 * Formatea fecha y hora.
 */
export function formatDateTime(date: Date | string | number): string {
  const d = typeof date === "object" && "getTime" in date ? date : new Date(date);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleString(LOCALE_DEFAULT, {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/**
 * Formatea una fecha en formato relativo (ej. "hace 2 días") para mejor comprensión DUA.
 */
export function formatRelativeDate(date: Date | string | number, base: Date = new Date()): string {
  const d = typeof date === "object" && "getTime" in date ? date : new Date(date);
  if (Number.isNaN(d.getTime())) return "";
  const baseTime = base.getTime();
  const diffMs = baseTime - d.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  if (diffDays === 0) return "Hoy";
  if (diffDays === 1) return "Ayer";
  if (diffDays > 1 && diffDays < 7) return `Hace ${diffDays} días`;
  if (diffDays >= 7 && diffDays < 30) return `Hace ${Math.floor(diffDays / 7)} semana(s)`;
  return formatDate(d);
}

/**
 * Trunca texto con ellipsis respetando longitud máxima (accesibilidad y DUA).
 */
export function truncateText(text: string, maxLength: number, suffix = "…"): string {
  if (!text || text.length <= maxLength) return text;
  return text.slice(0, maxLength - suffix.length).trim() + suffix;
}

/**
 * Capitaliza la primera letra de cada palabra para títulos consistentes.
 */
export function titleCase(text: string): string {
  return text
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}
