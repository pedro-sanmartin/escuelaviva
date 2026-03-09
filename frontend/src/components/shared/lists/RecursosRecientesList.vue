<template>
  <div class="card recursos-card">
    <div class="card-hdr">
      <span class="card-title">Recursos Recientes</span>
      <i class="pi pi-folder-open card-hdr-ic-r" />
    </div>
    <div class="recursos-list">
      <div v-for="r in recursos" :key="r.id" class="recurso-row">
        <div :class="['recurso-ic', r.color]">
          <i :class="`pi ${r.icon}`" />
        </div>
        <div class="recurso-body">
          <p class="recurso-name">{{ r.nombre }}</p>
          <span class="recurso-size">{{ r.size }}</span>
        </div>
        <button
          type="button"
          class="dl-btn"
          :aria-label="`Descargar ${r.nombre}`"
          @click="$emit('download', r)"
        >
          <i class="pi pi-download" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Recurso } from "@/types";

interface Props {
  recursos: Recurso[];
}

defineProps<Props>();

defineEmits<{
  download: [recurso: Recurso];
}>();
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
.card-hdr-ic-r {
  color: #64748b;
  font-size: 1rem;
}

.recursos-card {
  display: flex;
  flex-direction: column;
  min-height: 0;
}

.recursos-list {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  margin: 0 -0.25rem;
  padding: 0 0.25rem;
}

.recurso-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.625rem 0;
}
.recurso-row + .recurso-row {
  border-top: 1px solid #f1f5f9;
}
.recurso-ic {
  width: 34px;
  height: 34px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.875rem;
  flex-shrink: 0;
}
.recurso-ic.red {
  background: rgba(239, 68, 68, 0.1);
  color: #dc2626;
}
.recurso-ic.blue {
  background: rgba(59, 130, 246, 0.1);
  color: #2563eb;
}
.recurso-body {
  flex: 1;
  min-width: 0;
}
.recurso-name {
  font-size: 0.8125rem;
  font-weight: 500;
  color: #0f172a;
  margin: 0 0 0.2rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.recurso-size {
  font-size: 0.75rem;
  color: #64748b;
}
.dl-btn {
  min-width: 44px;
  min-height: 44px;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 1px solid #e2e8f0;
  background: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #64748b;
  font-size: 0.8rem;
  transition: all 0.15s;
  flex-shrink: 0;
  -webkit-tap-highlight-color: transparent;
}
.dl-btn:hover {
  color: #ff9800;
  border-color: #ff9800;
}
</style>
