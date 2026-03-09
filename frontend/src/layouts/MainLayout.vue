<template>
  <div
    class="main-layout"
    :class="{ 'main-layout--mobile': isMobile }"
    :style="desktopStyle"
  >
    <!-- Desktop: Sidebar fijo -->
    <TheSidebar v-if="!isMobile" />

    <!-- Móvil: Drawer (PrimeVue) -->
    <Drawer
      v-if="isMobile"
      v-model:visible="layoutStore.drawerOpen"
      position="left"
      :modal="true"
      :dismissable="true"
      :show-close-icon="false"
      class="sidebar-drawer"
      @hide="layoutStore.closeDrawer()"
    >
      <template #container="{ closeCallback }">
        <div class="drawer-inner">
          <button
            type="button"
            class="drawer-close"
            aria-label="Cerrar menú"
            @click="closeCallback"
          >
            <i class="pi pi-times" />
          </button>
          <SidebarContent />
        </div>
      </template>
    </Drawer>

    <div class="main-area">
      <TheNavbar />
      <main class="content">
        <div class="content-scroll">
          <router-view />
        </div>
      </main>
      <TheFooter />
    </div>
    <button class="help-fab" aria-label="Ayuda">
      <i class="pi pi-question-circle" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import Drawer from "primevue/drawer";
import { useLayoutStore } from "@/store/layout";
import { useScreen } from "@/composables/useScreen";
import TheSidebar from "@/components/layout/TheSidebar.vue";
import SidebarContent from "@/components/layout/SidebarContent.vue";
import TheNavbar from "@/components/layout/TheNavbar.vue";
import TheFooter from "@/components/layout/TheFooter.vue";

const layoutStore = useLayoutStore();
const { isMobile } = useScreen();

const desktopStyle = computed(() => {
  if (isMobile.value) return {};
  return {
    "--sidebar-width": layoutStore.isSidebarCollapsed ? "80px" : "260px",
  };
});
</script>

<style scoped>
.main-layout {
  display: grid;
  grid-template-columns: var(--sidebar-width, 260px) 1fr;
  height: 100vh;
  height: 100dvh;
  background: var(--ev-bg);
  font-family:
    system-ui,
    -apple-system,
    sans-serif;
  position: relative;
  overflow: hidden;
  transition: grid-template-columns 0.3s ease;
}

.main-layout--mobile {
  grid-template-columns: 1fr;
}

.main-area {
  display: flex;
  flex-direction: column;
  min-width: 0;
  min-height: 0;
  height: 100%;
  overflow: hidden;
  background: #f1f5f9;
}

.content {
  flex: 1;
  min-width: 0;
  min-height: 0;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 0.875rem 2rem;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}

.content-scroll {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
}

@media (max-width: 1023px) {
  .content {
    padding: 1.5rem 1rem 2.5rem;
  }
}

.help-fab {
  position: fixed;
  bottom: max(1.5rem, env(safe-area-inset-bottom));
  right: max(1.5rem, env(safe-area-inset-right));
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 1px solid #e2e8f0;
  background: #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #64748b;
  font-size: 1.2rem;
  transition: all 0.15s;
  z-index: 20;
}
.help-fab:hover {
  color: #ff9800;
  box-shadow: 0 6px 20px rgba(255, 152, 0, 0.18);
}
</style>

<style>
/* Drawer móvil: panel con ancho fijo y estilos del sidebar */
.sidebar-drawer.p-drawer .p-drawer-content {
  padding: 0;
  width: 280px;
  max-width: 85vw;
}

.sidebar-drawer .drawer-inner {
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
}

.sidebar-drawer .drawer-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 44px;
  height: 44px;
  min-width: 44px;
  min-height: 44px;
  border: none;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  color: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 5;
  transition: background 0.15s;
}

.sidebar-drawer .drawer-close:hover {
  background: rgba(255, 255, 255, 0.2);
}

.sidebar-drawer .drawer-inner > :last-child {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
}
</style>
