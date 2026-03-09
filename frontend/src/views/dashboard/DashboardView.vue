<template>
  <div class="dashboard-view" :data-mobile="isMobile">
    <!-- Skeleton / loading -->
    <div
      v-if="isLoading"
      class="dashboard-skeleton"
      aria-busy="true"
      aria-label="Cargando dashboard"
    >
      <div class="skeleton-bento">
        <div class="skeleton-block skeleton-welcome" />
        <div class="skeleton-block skeleton-ruta" />
        <div class="skeleton-block" />
        <div class="skeleton-block skeleton-cursos" />
        <div class="skeleton-block" />
        <div class="skeleton-block" />
        <div class="skeleton-block skeleton-recursos" />
      </div>
    </div>

    <!-- Error -->
    <div v-else-if="hasError" class="dashboard-error">
      <p>
        No se pudo cargar el dashboard. Revisa tu conexión e intenta de nuevo.
      </p>
    </div>

    <!-- Contenido -->
    <div v-else class="bento">
      <!-- Móvil/Tablet: 1 columna, orden vertical -->
      <template v-if="isMobile">
        <div class="bento-item">
          <WelcomeHeader
            :user-name="welcome.userName"
            :role="welcome.role"
            :summary="welcome.summary"
            :cta-label="welcome.ctaLabel"
            :image-url="welcome.imageUrl"
            image-alt="Docente"
            @explore="onExploreRecursos"
          />
        </div>
        <div v-if="rutaIA" class="bento-item">
          <RutaIAWidget
            :progress="rutaIA.progress"
            :next-route-name="rutaIA.nextRouteName"
            :next-route-line1="rutaIA.nextRouteLine1"
            :next-route-line2="rutaIA.nextRouteLine2"
          />
        </div>
        <div class="bento-item">
          <AlertasPieList :alertas="alertas" @ver-todo="verTodasAlertas" />
        </div>
        <div class="bento-item">
          <div class="card microcursos-card">
            <div class="card-hdr">
              <span class="card-title section-t">Mis Microcursos</span>
              <a class="link-action" @click="onVerMicrocursos">Ver todos</a>
            </div>
            <div class="cursos-grid">
              <MicrocursoCard v-for="c in microcursos" :key="c.id" :curso="c" />
            </div>
          </div>
        </div>
        <div v-if="eduComunidad" class="bento-item">
          <EduComunidadCard
            :description="eduComunidad.description"
            :avatars="eduComunidad.avatars"
            :extra-count="eduComunidad.extraCount"
            :action-label="eduComunidad.actionLabel"
            @join="unirseAlChat"
          />
        </div>
        <div class="bento-item">
          <LogrosRecientesList :logros="logros" />
        </div>
        <div class="bento-item">
          <RecursosRecientesList
            :recursos="recursos"
            @download="downloadRecurso"
          />
        </div>
      </template>

      <!-- Desktop: estructura original (col-main + col-right) -->
      <template v-else>
        <div class="col-main">
          <WelcomeHeader
            :user-name="welcome.userName"
            :role="welcome.role"
            :summary="welcome.summary"
            :cta-label="welcome.ctaLabel"
            :image-url="welcome.imageUrl"
            image-alt="Docente"
            @explore="onExploreRecursos"
          />
          <div class="mid-row">
            <AlertasPieList :alertas="alertas" @ver-todo="verTodasAlertas" />
            <EduComunidadCard
              v-if="eduComunidad"
              :description="eduComunidad.description"
              :avatars="eduComunidad.avatars"
              :extra-count="eduComunidad.extraCount"
              :action-label="eduComunidad.actionLabel"
              @join="unirseAlChat"
            />
            <LogrosRecientesList :logros="logros" />
          </div>
          <div class="card microcursos-card">
            <div class="card-hdr">
              <span class="card-title section-t">Mis Microcursos</span>
              <a class="link-action" @click="onVerMicrocursos">Ver todos</a>
            </div>
            <div class="cursos-grid">
              <MicrocursoCard v-for="c in microcursos" :key="c.id" :curso="c" />
            </div>
          </div>
        </div>
        <div class="col-right">
          <RutaIAWidget
            v-if="rutaIA"
            :progress="rutaIA.progress"
            :next-route-name="rutaIA.nextRouteName"
            :next-route-line1="rutaIA.nextRouteLine1"
            :next-route-line2="rutaIA.nextRouteLine2"
          />
          <RecursosRecientesList
            :recursos="recursos"
            @download="downloadRecurso"
          />
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from "vue";
import { storeToRefs } from "pinia";
import { useUserStore } from "@/store/user";
import WelcomeHeader from "@/components/shared/widgets/WelcomeHeader.vue";
import RutaIAWidget from "@/components/shared/widgets/RutaIAWidget.vue";
import EduComunidadCard from "@/components/shared/widgets/EduComunidadCard.vue";
import AlertasPieList from "@/components/shared/lists/AlertasPieList.vue";
import LogrosRecientesList from "@/components/shared/lists/LogrosRecientesList.vue";
import RecursosRecientesList from "@/components/shared/lists/RecursosRecientesList.vue";
import MicrocursoCard from "@/components/shared/cards/MicrocursoCard.vue";
import { useAcademic } from "@/composables/useAcademic";
import { useInclusion } from "@/composables/useInclusion";
import { useCommunity } from "@/composables/useCommunity";
import { useScreen } from "@/composables/useScreen";

// ─── Composables (servicios con loading/error) ───
const {
  microcursos,
  recursos,
  rutaIA,
  loading: loadingAcademic,
  error: errorAcademic,
  loadDashboardData,
  downloadRecurso,
} = useAcademic();

const {
  alertas,
  loading: loadingInclusion,
  error: errorInclusion,
  loadAlertas,
  verTodasAlertas,
} = useInclusion();

const {
  eduComunidad,
  logros,
  loading: loadingCommunity,
  error: errorCommunity,
  loadCommunityData,
  unirseAlChat,
} = useCommunity();

const { isMobile } = useScreen();

const userStore = useUserStore();
const { welcome } = storeToRefs(userStore);

const isLoading = computed(
  () =>
    loadingAcademic.value || loadingInclusion.value || loadingCommunity.value,
);
const hasError = computed(
  () =>
    !!errorAcademic.value || !!errorInclusion.value || !!errorCommunity.value,
);

onMounted(() => {
  Promise.all([loadDashboardData(), loadAlertas(), loadCommunityData()]);
});

function onExploreRecursos() {
  // router.push('/recursos')
}

function onVerMicrocursos() {
  // router.push('/microcursos')
}
</script>

<style scoped>
.dashboard-view {
  flex: 1;
  min-width: 0;
  min-height: 0;
  display: flex;
  flex-direction: column;
}

/* ─── Skeleton (inclusión técnica: accesible, preparado para PWA/offline) ─── */
.dashboard-skeleton {
  flex: 1;
  min-width: 0;
  min-height: 0;
  display: flex;
  flex-direction: column;
}
.skeleton-bento {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

@media (min-width: 1024px) {
  .skeleton-bento {
    display: grid;
    grid-template-columns: minmax(0, 1fr) 268px;
    gap: 1.5rem;
  }
}
.skeleton-block {
  background: linear-gradient(90deg, #e2e8f0 25%, #f1f5f9 50%, #e2e8f0 75%);
  background-size: 200% 100%;
  animation: skeleton-shine 1.2s ease-in-out infinite;
  border-radius: 16px;
  min-height: 120px;
}
.skeleton-welcome {
  min-height: 200px;
}
.skeleton-cursos {
  min-height: 180px;
}
.skeleton-ruta {
  min-height: 228px;
}
.skeleton-recursos {
  min-height: 200px;
}
@keyframes skeleton-shine {
  to {
    background-position: 200% 0;
  }
}

.dashboard-error {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  text-align: center;
  color: #64748b;
  font-size: 0.9375rem;
}

/* Móvil/Tablet: 1 columna con buen espaciado entre cards */
.bento {
  flex: 1;
  min-width: 0;
  max-width: 100%;
  min-height: 0;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  align-items: stretch;
}

.bento-item {
  min-width: 0;
  flex-shrink: 0;
}

/* Desktop: 2 columnas, sin scroll (fit viewport) */
@media (min-width: 1024px) {
  .bento {
    display: grid;
    grid-template-columns: minmax(0, 1fr) 268px;
    gap: 1.25rem;
    min-height: 0;
    overflow: hidden;
  }

  .col-main {
    display: grid;
    grid-template-rows: auto auto minmax(0, 1fr);
    gap: 0.875rem;
    min-width: 0;
    min-height: 0;
    overflow: hidden;
  }

  .mid-row {
    display: grid;
    grid-template-columns: 2fr 1.4fr 1.4fr;
    gap: 1.25rem;
    min-height: 0;
  }

  .col-right {
    display: grid;
    grid-template-rows: auto minmax(0, 1fr);
    gap: 0.875rem;
    min-width: 0;
    min-height: 0;
    overflow: hidden;
  }
}

.card {
  background: #ffffff;
  border-radius: 16px;
  border: 1px solid #e2e8f0;
  padding: 1rem 1.25rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  min-width: 0;
}

.microcursos-card {
  display: flex;
  flex-direction: column;
  min-height: 0;
  padding: 0rem 1.25rem 1rem 1.25rem;
}
.microcursos-card .card-hdr {
  margin-bottom: 0.65rem;
}

.card-hdr {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  margin-bottom: 0.875rem;
}
.card-title {
  font-size: 0.9375rem;
  font-weight: 600;
  color: #0f172a;
  flex: 1;
}
.section-t {
  font-size: 1.0625rem;
}
.link-action {
  font-size: 0.8125rem;
  color: #ff9800;
  cursor: pointer;
  font-weight: 500;
  margin-left: auto;
  white-space: nowrap;
  padding: 0.5rem 0.75rem;
  min-height: 44px;
  min-width: 44px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  -webkit-tap-highlight-color: transparent;
}

.cursos-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  grid-auto-rows: 1fr;
}

@media (min-width: 640px) {
  .cursos-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.25rem;
  }
}

@media (min-width: 1024px) {
  .cursos-grid {
    grid-template-columns: repeat(4, 1fr);
    gap: 1rem;
  }
}

.microcursos-card .cursos-grid {
  flex: 1;
  min-height: 0;
  align-content: stretch;
}
</style>
