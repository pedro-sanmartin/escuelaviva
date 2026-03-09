/**
 * Servicio académico: dashboard, microcursos, recursos.
 * Contrato público tipado. Origen de datos: mock (sustituible por Apollo/GraphQL).
 */
import type { Curso, Recurso } from "@/types";
import type { DashboardAcademicData } from "@/types";
import {
  MOCK_MICROCURSOS,
  MOCK_RECURSOS,
  MOCK_RUTA_IA,
  withMockLatency,
} from "./academic.mock";

/**
 * Obtiene datos del dashboard (microcursos, recursos, ruta IA).
 * En producción: ejecutar GET_DASHBOARD_DATA contra Apollo.
 */
export function fetchDashboardData(): Promise<DashboardAcademicData> {
  return withMockLatency({
    microcursos: [...MOCK_MICROCURSOS],
    recursosRecientes: [...MOCK_RECURSOS],
    rutaIA: { ...MOCK_RUTA_IA },
  });
}

/**
 * Obtiene solo microcursos (p. ej. para vista de listado).
 */
export function fetchMicrocursos(): Promise<Curso[]> {
  return withMockLatency([...MOCK_MICROCURSOS]);
}

/**
 * Obtiene solo recursos recientes.
 */
export function fetchRecursosRecientes(): Promise<Recurso[]> {
  return withMockLatency([...MOCK_RECURSOS]);
}

/**
 * Descarga un recurso (en producción: signed URL, blob, etc.).
 */
export function downloadRecurso(_recurso: Recurso): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.debug("[academic.service] downloadRecurso", _recurso.nombre);
      resolve();
    }, 300);
  });
}
