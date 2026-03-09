import { ref, type Ref } from "vue";
import type { Logro, EduComunidadData } from "@/types";
import {
  fetchEduComunidad,
  fetchLogrosRecientes,
} from "@/services/community.service";

/**
 * Lógica de comunidad consumiendo community.service.
 * Expone loading y error para UI.
 */
export function useCommunity() {
  const eduComunidad = ref<EduComunidadData | null>(null);
  const logros: Ref<Logro[]> = ref([]);
  const loading = ref(false);
  const error = ref<Error | null>(null);

  async function loadCommunityData(): Promise<void> {
    loading.value = true;
    error.value = null;
    try {
      const [edu, logrosData] = await Promise.all([
        fetchEduComunidad(),
        fetchLogrosRecientes(),
      ]);
      eduComunidad.value = edu;
      logros.value = logrosData;
    } catch (e) {
      error.value = e instanceof Error ? e : new Error(String(e));
    } finally {
      loading.value = false;
    }
  }

  function unirseAlChat(): void {
    console.debug("[useCommunity] unirseAlChat");
  }

  return {
    eduComunidad,
    logros,
    loading,
    error,
    loadCommunityData,
    unirseAlChat,
  };
}
