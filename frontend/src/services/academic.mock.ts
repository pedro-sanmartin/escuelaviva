/**
 * Datos mock para el servicio académico.
 * Separado del contrato público para facilitar el cambio a Apollo/GraphQL.
 * En producción: sustituir por llamadas a createApolloClient().query(...)
 */
import type { Curso, Recurso } from "@/types";
import type { RutaIA } from "@/types";
import { MOCK_NETWORK_LATENCY_MS } from "@/constants/ui.constants";

export const MOCK_MICROCURSOS: Curso[] = [
  {
    id: 1,
    nombre: "Estrategias DUA",
    pct: 75,
    icon: "pi-lightbulb",
    color: "orange",
    desc: "Diseña clases accesibles para todos los estudiantes.",
    img: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=240&fit=crop",
  },
  {
    id: 2,
    nombre: "Neurodiversidad",
    pct: 40,
    icon: "pi-sitemap",
    color: "blue",
    desc: "Comprende y acompaña las distintas formas de aprender.",
    img: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=400&h=240&fit=crop",
  },
  {
    id: 3,
    nombre: "Evaluación Inclusiva",
    pct: 90,
    icon: "pi-check-square",
    color: "green",
    desc: "Instrumentos y criterios de evaluación diversificada.",
    img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=280&fit=crop",
  },
  {
    id: 4,
    nombre: "TIC en el Aula",
    pct: 20,
    icon: "pi-desktop",
    color: "purple",
    desc: "Herramientas digitales para potenciar el aprendizaje.",
    img: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=240&fit=crop",
  },
];

export const MOCK_RECURSOS: Recurso[] = [
  { id: 1, nombre: "Guia DUA 2024.pdf", size: "2.4 MB", icon: "pi-file-pdf", color: "red" },
  { id: 2, nombre: "Manual PIE.pdf", size: "1.8 MB", icon: "pi-file-pdf", color: "blue" },
  { id: 3, nombre: "Protocolo Inclusión.docx", size: "850 KB", icon: "pi-file", color: "blue" },
  { id: 4, nombre: "Ajustes Curriculares NEE.pdf", size: "1.2 MB", icon: "pi-file-pdf", color: "red" },
  { id: 5, nombre: "Evaluación Diferenciada.docx", size: "620 KB", icon: "pi-file", color: "blue" },
  { id: 6, nombre: "Rúbricas DUA 2024.pdf", size: "3.1 MB", icon: "pi-file-pdf", color: "red" },
  { id: 7, nombre: "Calendario Escolar 2025.pdf", size: "450 KB", icon: "pi-file-pdf", color: "blue" },
  { id: 8, nombre: "Guía TIC en el Aula.pdf", size: "2.0 MB", icon: "pi-file-pdf", color: "red" },
];

export const MOCK_RUTA_IA: RutaIA = {
  progress: 68,
  nextRouteName: "IA Generativa",
  nextRouteLine1: "IA",
  nextRouteLine2: "Generativa",
};

/** Simula latencia de red. Sustituir por Apollo/offline en producción. */
export function withMockLatency<T>(data: T): Promise<T> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(data), MOCK_NETWORK_LATENCY_MS);
  });
}
