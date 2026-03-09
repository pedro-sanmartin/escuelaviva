<template>
  <div class="card welcome-card">
    <div class="welcome-body">
      <h2 class="welcome-h">¡Hola, {{ userName }}! <span>👋</span></h2>
      <p v-if="summary" class="welcome-p">{{ summary }}</p>
      <button type="button" class="ev-btn-primary" @click="$emit('explore')">
        <i class="pi pi-compass" />
        <span>{{ ctaLabel }}</span>
      </button>
    </div>
    <div v-if="imageUrl" class="welcome-img-wrap">
      <img :src="imageUrl" :alt="imageAlt" class="welcome-img" />
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  userName: string;
  role?: string;
  summary?: string;
  ctaLabel?: string;
  imageUrl?: string;
  imageAlt?: string;
}

withDefaults(defineProps<Props>(), {
  role: "",
  summary: "",
  ctaLabel: "Explorar Recursos",
  imageUrl: "",
  imageAlt: "Ilustración",
});

defineEmits<{
  explore: [];
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

.welcome-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  padding: 1.5rem 1.75rem;
  min-height: 0;
  background: linear-gradient(135deg, #fff 0%, #fff8f0 100%);
  overflow: hidden;
}
.welcome-body {
  flex: 1;
  min-width: 0;
}
.welcome-h {
  font-size: 1.625rem;
  font-weight: 700;
  color: #0f172a;
  margin: 0 0 0.5rem;
  line-height: 1.2;
}
.welcome-p {
  font-size: 0.9rem;
  color: #64748b;
  line-height: 1.55;
  margin: 0 0 1.25rem;
  max-width: 100%;
  white-space: pre-line;
}
.ev-btn-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background: #ff9800;
  color: #fff;
  border: none;
  border-radius: 50px;
  padding: 0.75rem 1.5rem;
  min-height: 44px;
  min-width: 44px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s;
  -webkit-tap-highlight-color: transparent;
}
.ev-btn-primary:hover {
  background: #fb8c00;
}
.welcome-img-wrap {
  flex-shrink: 0;
  width: 180px;
  height: 160px;
  border-radius: 12px;
  overflow: hidden;
}

@media (max-width: 639px) {
  .welcome-card {
    flex-direction: column;
    padding: 1.25rem 1rem;
    text-align: center;
  }
  .welcome-body {
    order: 1;
  }
  .welcome-img-wrap {
    order: 0;
    width: 120px;
    height: 100px;
  }
  .welcome-h {
    font-size: 1.25rem;
  }
}
.welcome-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
