<template>
  <aside
    class="sidebar"
    :class="{ 'sidebar--collapsed': layoutStore.isSidebarCollapsed }"
  >
    <SidebarContent />
  </aside>
</template>

<script setup lang="ts">
import { useLayoutStore } from "@/store/layout";
import SidebarContent from "./SidebarContent.vue";

const layoutStore = useLayoutStore();
</script>

<style scoped>
.sidebar {
  width: var(--sidebar-width, 260px);
  min-width: var(--sidebar-width, 260px);
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  height: 100vh;
  position: sticky;
  top: 0;
  overflow: hidden;
  transition:
    width 0.3s ease,
    min-width 0.3s ease;
}

.sidebar--collapsed {
  --sidebar-width: 80px;
}

.sidebar--collapsed .sidebar-content :deep(.logo-box) {
  max-width: 48px;
  height: 48px;
}

.sidebar--collapsed .sidebar-content :deep(.sidebar-nav) {
  align-items: center;
  padding: 0.875rem 0.5rem;
}

.sidebar--collapsed .sidebar-content :deep(.nav-item) {
  justify-content: center;
  padding: 0.575rem;
  width: 100%;
}

.sidebar--collapsed .sidebar-content :deep(.nav-item-label) {
  display: none;
}

.sidebar--collapsed .sidebar-content :deep(.sidebar-dua) {
  align-items: center;
}

.sidebar--collapsed .sidebar-content :deep(.sidebar-dua .nav-item-label) {
  display: none;
}

.sidebar--collapsed .sidebar-content :deep(.logout-btn) {
  justify-content: center;
  padding: 0.575rem;
}

.sidebar--collapsed .sidebar-content :deep(.logout-btn-label) {
  display: none;
}
</style>
