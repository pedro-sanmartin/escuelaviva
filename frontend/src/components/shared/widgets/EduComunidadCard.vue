<template>
  <div class="card edu-card">
    <div class="card-hdr">
      <span class="card-title">EduComunidad</span>
      <i class="pi pi-comments card-hdr-ic-r" />
    </div>
    <p v-if="description" class="edu-sub">{{ description }}</p>
    <div class="av-stack">
      <img
        v-for="av in avatars"
        :key="av.id"
        :src="av.img"
        :alt="`Miembro ${av.id}`"
        class="av-item"
      />
      <span v-if="extraCount != null && extraCount > 0" class="av-more"
        >+{{ extraCount }}</span
      >
    </div>
    <button
      type="button"
      class="ev-btn-outline chat-btn"
      aria-label="Unirse al chat"
      @click="$emit('join')"
    >
      <i class="pi pi-comments" />
      <span>{{ actionLabel }}</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import type { CommunityAvatar } from "@/types";

interface Props {
  description?: string;
  avatars: CommunityAvatar[];
  extraCount?: number;
  actionLabel?: string;
}

withDefaults(defineProps<Props>(), {
  description: "",
  extraCount: 0,
  actionLabel: "Unirse al Chat",
});

defineEmits<{
  join: [];
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

.edu-card {
  display: flex;
  flex-direction: column;
}
.edu-sub {
  font-size: 0.85rem;
  color: #64748b;
  line-height: 1.55;
  margin-bottom: 1rem;
  flex: 1;
}
.av-stack {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}
.av-item {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #fff;
  margin-right: -8px;
}
.av-more {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: #e2e8f0;
  font-size: 0.7rem;
  font-weight: 700;
  color: #64748b;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #fff;
  margin-left: 8px;
}
.ev-btn-outline {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background: #fff;
  color: #0f172a;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 0.65rem 1rem;
  min-height: 44px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.15s;
  width: 100%;
  -webkit-tap-highlight-color: transparent;
}
.ev-btn-outline:hover {
  background: #f1f5f9;
}
.chat-btn {
  margin-top: auto;
}
</style>
