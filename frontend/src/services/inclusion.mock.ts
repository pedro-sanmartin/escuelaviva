/**
 * Datos mock para el servicio de inclusión (Panel PIE).
 * Separado del contrato público para facilitar el cambio a Apollo/GraphQL.
 */
import type { Alert } from "@/types";
import { MOCK_NETWORK_LATENCY_MS } from "@/constants/ui.constants";

export const MOCK_ALERTAS_PIE: Alert[] = [
  {
    id: 1,
    titulo: "Validación NEE: Sofía González",
    sub: "Pendiente de firma directiva",
    tipo: "urgente",
    badge: "URGENTE",
  },
  {
    id: 2,
    titulo: "Actualización PIE: 2° Medio B",
    sub: "Reporte trimestral disponible",
    tipo: "pendiente",
    badge: "PENDIENTE",
  },
];

export function withMockLatency<T>(data: T): Promise<T> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(data), MOCK_NETWORK_LATENCY_MS);
  });
}
