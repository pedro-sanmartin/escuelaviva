<template>
  <div class="curso-card">
    <div class="curso-img-wrap">
      <img :src="curso.img" :alt="curso.nombre" class="curso-img" />
      <span class="curso-pct">{{ curso.pct }}%</span>
    </div>
    <div class="curso-body">
      <div :class="['curso-icon', curso.color]">
        <i :class="`pi ${curso.icon}`" />
      </div>
      <p class="curso-name">{{ curso.nombre }}</p>
      <p class="curso-desc">{{ curso.desc }}</p>
      <div class="prog-track">
        <div class="prog-bar" :style="{ width: `${curso.pct}%` }" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Curso } from "@/types";

interface Props {
  curso: Curso;
}

defineProps<Props>();
</script>

<style scoped>
.curso-card {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  min-height: 0;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  background: #fff;
  overflow: hidden;
  transition: box-shadow 0.15s;
}
.curso-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}
.curso-img-wrap {
  position: relative;
  flex-shrink: 0;
  height: 118px;
  overflow: hidden;
  background: #e2e8f0;
}

@media (max-width: 639px) {
  .curso-img-wrap {
    height: auto;
    aspect-ratio: 16 / 9;
  }
}

.curso-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
}
.curso-img-wrap .curso-pct {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background: rgba(0, 0, 0, 0.65);
  color: #fff;
  font-size: 0.75rem;
  font-weight: 700;
  padding: 0.2rem 0.5rem;
  border-radius: 6px;
  line-height: 1.2;
}
.curso-body {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  padding: 0.75rem 0.875rem;
  gap: 0.5rem;
}
.curso-body .curso-icon {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
  flex-shrink: 0;
}
.curso-body .curso-name {
  font-size: 0.875rem;
  font-weight: 600;
  color: #0f172a;
  margin: 0;
  line-height: 1.3;
}
.curso-body .curso-desc {
  font-size: 0.75rem;
  color: #64748b;
  line-height: 1.4;
  margin: 0;
  flex: 1;
  min-height: 2.5em;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.curso-body .prog-track {
  flex-shrink: 0;
  margin-top: 0.25rem;
}
.curso-icon.orange {
  background: rgba(255, 152, 0, 0.12);
  color: #ff9800;
}
.curso-icon.blue {
  background: rgba(59, 130, 246, 0.12);
  color: #3b82f6;
}
.curso-icon.green {
  background: rgba(34, 197, 94, 0.12);
  color: #16a34a;
}
.curso-icon.purple {
  background: rgba(168, 85, 247, 0.12);
  color: #9333ea;
}

.prog-track {
  width: 100%;
  height: 6px;
  background: #e2e8f0;
  border-radius: 3px;
  overflow: hidden;
}
.prog-bar {
  height: 100%;
  background: #ff9800;
  border-radius: 3px;
  transition: width 0.3s;
}
</style>
