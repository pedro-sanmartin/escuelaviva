/**
 * Tipos del dominio Académico / Dashboard.
 * Unificados para servicio, composable y componentes.
 * Preparado para contrato GraphQL (GET_DASHBOARD_DATA).
 */
import type { Curso, Recurso } from "./dashboard";

/** Estado de la ruta de aprendizaje IA (widget dashboard) */
export interface RutaIA {
  progress: number;
  nextRouteName: string;
  nextRouteLine1: string;
  nextRouteLine2: string;
}

/** Respuesta de datos académicos del dashboard (microcursos, recursos, ruta IA) */
export interface DashboardAcademicData {
  microcursos: Curso[];
  recursosRecientes: Recurso[];
  rutaIA: RutaIA;
}
