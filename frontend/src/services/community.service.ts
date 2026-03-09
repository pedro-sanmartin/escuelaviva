/**
 * Servicio de comunidad: EduComunidad, logros.
 * Contrato público tipado. Origen de datos: mock (sustituible por Apollo/GraphQL).
 */
import type { Logro, EduComunidadData } from "@/types";
import {
  MOCK_EDU_COMUNIDAD,
  MOCK_LOGROS,
  withMockLatency,
} from "./community.mock";

/**
 * Obtiene datos de EduComunidad (descripción, avatares, etc.).
 */
export function fetchEduComunidad(): Promise<EduComunidadData> {
  return withMockLatency({ ...MOCK_EDU_COMUNIDAD });
}

/**
 * Obtiene logros recientes del usuario.
 */
export function fetchLogrosRecientes(): Promise<Logro[]> {
  return withMockLatency([...MOCK_LOGROS]);
}
