/**
 * Datos mock para el servicio de comunidad.
 * Separado del contrato público para facilitar el cambio a Apollo/GraphQL.
 */
import type { Logro, CommunityAvatar, EduComunidadData } from "@/types";
import { MOCK_NETWORK_LATENCY_MS } from "@/constants/ui.constants";

export const MOCK_LOGROS: Logro[] = [
  {
    id: 1,
    nombre: "Mentor DUA",
    sub: "Obtenido hace 2 días",
    icon: "pi-star",
    color: "gold",
  },
  {
    id: 2,
    nombre: "7 Días Racha IA",
    sub: "(Sigue así)",
    icon: "pi-bolt",
    color: "primary",
  },
];

export const MOCK_AVATARS: CommunityAvatar[] = [
  { id: 1, img: "https://i.pravatar.cc/40?img=5" },
  { id: 2, img: "https://i.pravatar.cc/40?img=8" },
  { id: 3, img: "https://i.pravatar.cc/40?img=11" },
];

export const MOCK_EDU_COMUNIDAD: EduComunidadData = {
  description: "Conversaciones activas en tu red docente.",
  avatars: MOCK_AVATARS,
  extraCount: 12,
  actionLabel: "Unirse al Chat",
};

export function withMockLatency<T>(data: T): Promise<T> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(data), MOCK_NETWORK_LATENCY_MS);
  });
}
