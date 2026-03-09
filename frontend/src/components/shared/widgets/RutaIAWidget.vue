<template>
  <div class="card ruta-card">
    <div class="card-hdr">
      <span class="card-title">Ruta IA</span>
      <i class="pi pi-bolt card-hdr-ic-orange" />
    </div>
    <div class="sparkline-wrap">
      <svg
        viewBox="0 0 200 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        class="sparkline"
      >
        <path
          d="M0,38 C15,38 20,28 35,22 S55,8 70,14 S90,30 105,22 S130,6 145,10 S165,18 180,12 L200,8"
          stroke="#FF9800"
          stroke-width="2.5"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <circle cx="200" cy="8" r="4" fill="#FF9800" />
      </svg>
    </div>
    <div class="ruta-bottom">
      <span class="ruta-pct">{{ progress }}%</span>
      <div class="ruta-labels">
        <div>
          <p class="ruta-key">PROGRESO</p>
          <p class="ruta-key">ACTUAL</p>
        </div>
        <div class="ruta-sep" />
        <div>
          <template v-if="nextRouteLine1 != null && nextRouteLine2 != null">
            <p class="ruta-next">Próximo: {{ nextRouteLine1 }}</p>
            <p class="ruta-next">{{ nextRouteLine2 }}</p>
          </template>
          <template v-else>
            <p class="ruta-next">Próximo: {{ nextRouteName }}</p>
          </template>
        </div>
      </div>
    </div>
    <div class="prog-track ruta-track">
      <div class="prog-bar" :style="{ width: `${progress}%` }" />
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  progress: number;
  nextRouteName: string;
  /** Primera línea: ej. "IA" → "Próximo: IA" */
  nextRouteLine1?: string;
  /** Segunda línea: ej. "Generativa" */
  nextRouteLine2?: string;
}

defineProps<Props>();
</script>

<style scoped>
.card {
  background: #ffffff;
  border-radius: 16px;
  border: 1px solid #e2e8f0;
  padding: 1rem 1.25rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  min-width: 0;
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
.card-hdr-ic-orange {
  color: #ff9800;
  font-size: 1.1rem;
}

.ruta-card {
  min-height: 0;
  display: flex;
  flex-direction: column;
}
.sparkline-wrap {
  margin: -0.25rem 0 0.5rem;
  overflow: hidden;
}
.sparkline {
  width: 100%;
  height: 48px;
  display: block;
}

.ruta-bottom {
  margin-bottom: 1rem;
}
.ruta-pct {
  display: block;
  font-size: 2.75rem;
  font-weight: 800;
  color: #ff9800;
  line-height: 1;
  margin-bottom: 0.625rem;
}
.ruta-labels {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}
.ruta-key {
  font-size: 0.6875rem;
  font-weight: 700;
  color: #64748b;
  margin: 0;
  line-height: 1.4;
  letter-spacing: 0.04em;
}
.ruta-sep {
  width: 1px;
  height: 2rem;
  background: #e2e8f0;
  flex-shrink: 0;
}
.ruta-next {
  font-size: 0.75rem;
  color: #64748b;
  margin: 0;
  line-height: 1.5;
}

.prog-track {
  width: 100%;
  height: 6px;
  background: #e2e8f0;
  border-radius: 3px;
  overflow: hidden;
}
.ruta-track {
  margin-top: 0.5rem;
  height: 8px;
}
.prog-bar {
  height: 100%;
  background: #ff9800;
  border-radius: 3px;
  transition: width 0.3s;
}
.ruta-track .prog-bar {
  height: 8px;
}
</style>
