import { ref, type Ref } from "vue";
import type { Alert } from "@/types";
import { fetchAlertasPIE } from "@/services/inclusion.service";

/**
 * Lógica de inclusión (Panel PIE) consumiendo inclusion.service.
 * Expone loading y error para UI.
 */
export function useInclusion() {
  const alertas: Ref<Alert[]> = ref([]);
  const loading = ref(false);
  const error = ref<Error | null>(null);

  async function loadAlertas(): Promise<void> {
    loading.value = true;
    error.value = null;
    try {
      alertas.value = await fetchAlertasPIE();
    } catch (e) {
      error.value = e instanceof Error ? e : new Error(String(e));
    } finally {
      loading.value = false;
    }
  }

  function verTodasAlertas(): void {
    // Navegación o modal (p. ej. router.push('/panel-pie'))
    console.debug("[useInclusion] verTodasAlertas");
  }

  return {
    alertas,
    loading,
    error,
    loadAlertas,
    verTodasAlertas,
  };
}
