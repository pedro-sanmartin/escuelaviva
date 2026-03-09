/**
 * Servicio de inclusión: alertas Panel PIE.
 * Contrato público tipado. Origen de datos: mock (sustituible por Apollo/GraphQL).
 */
import type { Alert } from "@/types";
import { MOCK_ALERTAS_PIE, withMockLatency } from "./inclusion.mock";

/**
 * Obtiene alertas del Panel PIE.
 * En producción: ejecutar GET_ALERTAS_PIE contra Apollo.
 */
export function fetchAlertasPIE(): Promise<Alert[]> {
  return withMockLatency([...MOCK_ALERTAS_PIE]);
}
