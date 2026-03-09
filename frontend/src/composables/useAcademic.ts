import { ref, type Ref } from "vue";
import type { Curso, Recurso, RutaIA } from "@/types";
import {
  fetchDashboardData,
  downloadRecurso as downloadRecursoService,
} from "@/services/academic.service";

/**
 * Lógica académica consumiendo academic.service.
 * Expone loading y error para UI (skeleton, mensajes).
 */
export function useAcademic() {
  const microcursos: Ref<Curso[]> = ref([]);
  const recursos: Ref<Recurso[]> = ref([]);
  const rutaIA: Ref<RutaIA | null> = ref(null);
  const loading = ref(false);
  const error = ref<Error | null>(null);

  async function loadDashboardData(): Promise<void> {
    loading.value = true;
    error.value = null;
    try {
      const data = await fetchDashboardData();
      microcursos.value = data.microcursos;
      recursos.value = data.recursosRecientes;
      rutaIA.value = data.rutaIA;
    } catch (e) {
      error.value = e instanceof Error ? e : new Error(String(e));
    } finally {
      loading.value = false;
    }
  }

  function getMicrocursos(): Curso[] {
    return microcursos.value;
  }

  async function downloadRecurso(recurso: Recurso): Promise<void> {
    try {
      await downloadRecursoService(recurso);
    } catch (e) {
      console.error("[useAcademic] downloadRecurso", e);
    }
  }

  return {
    microcursos,
    recursos,
    rutaIA,
    loading,
    error,
    loadDashboardData,
    getMicrocursos,
    downloadRecurso,
  };
}
