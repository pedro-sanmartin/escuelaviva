<template>
  <div class="card">
    <div class="card-hdr">
      <i class="pi pi-list-check card-hdr-ic" />
      <span class="card-title">Alertas Panel PIE</span>
      <span v-if="alertas.length > 0" class="pill-orange">{{
        alertas.length
      }}</span>
      <button
        type="button"
        class="link-action"
        aria-label="Ver todas las alertas"
        @click="$emit('ver-todo')"
      >
        Ver todo
      </button>
    </div>
    <div v-for="a in alertas" :key="a.id" class="alert-row">
      <div :class="['alert-bar', a.tipo]" />
      <div class="alert-body">
        <p class="alert-title">{{ a.titulo }}</p>
        <span class="alert-sub">{{ a.sub }}</span>
      </div>
      <span :class="['alert-tag', a.tipo]">{{ a.badge }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Alert } from "@/types";

interface Props {
  alertas: Alert[];
}

defineProps<Props>();

defineEmits<{
  "ver-todo": [];
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
.card-hdr-ic {
  color: #64748b;
  font-size: 0.875rem;
}
.pill-orange {
  background: #ff9800;
  color: #fff;
  font-size: 0.7rem;
  font-weight: 700;
  padding: 0.15rem 0.5rem;
  border-radius: 1rem;
  line-height: 1.4;
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
  border: none;
  background: none;
  -webkit-tap-highlight-color: transparent;
}

.alert-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 0;
  border-bottom: 1px solid #f1f5f9;
}
.alert-row:last-child {
  border-bottom: none;
}
.alert-bar {
  width: 3px;
  height: 2.25rem;
  border-radius: 2px;
  flex-shrink: 0;
}
.alert-bar.urgente {
  background: #ef4444;
}
.alert-bar.pendiente {
  background: #3b82f6;
}
.alert-body {
  flex: 1;
  min-width: 0;
}
.alert-title {
  font-size: 0.8125rem;
  font-weight: 600;
  color: #0f172a;
  margin: 0 0 0.2rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.alert-sub {
  font-size: 0.75rem;
  color: #64748b;
}
.alert-tag {
  font-size: 0.6875rem;
  font-weight: 700;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  flex-shrink: 0;
  letter-spacing: 0.03em;
}
.alert-tag.urgente {
  background: #ef4444;
  color: #fff;
}
.alert-tag.pendiente {
  background: #3b82f6;
  color: #fff;
}
</style>
