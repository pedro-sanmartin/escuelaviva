<template>
  <div class="card">
    <div class="card-hdr">
      <span class="card-title">Logros Recientes</span>
      <i class="pi pi-trophy card-hdr-ic-r" />
    </div>
    <div v-for="l in logros" :key="l.id" class="logro-row">
      <div :class="['logro-icon', l.color]">
        <i :class="`pi ${l.icon}`" />
      </div>
      <div>
        <p class="logro-name">{{ l.nombre }}</p>
        <span class="logro-sub">{{ l.sub }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Logro } from "@/types";

interface Props {
  logros: Logro[];
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
.card-hdr-ic-r {
  color: #64748b;
  font-size: 1rem;
}

.logro-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.6rem 0;
}
.logro-row + .logro-row {
  border-top: 1px solid #f1f5f9;
}
.logro-icon {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.875rem;
  flex-shrink: 0;
}
.logro-icon.gold {
  background: rgba(251, 191, 36, 0.12);
  color: #d97706;
}
.logro-icon.primary {
  background: rgba(255, 152, 0, 0.12);
  color: #ff9800;
}
.logro-name {
  font-size: 0.8125rem;
  font-weight: 600;
  color: #0f172a;
  margin: 0 0 0.15rem;
}
.logro-sub {
  font-size: 0.75rem;
  color: #64748b;
}
</style>
