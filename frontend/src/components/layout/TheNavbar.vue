<template>
  <header class="topbar">
    <!-- Botón hamburguesa: solo móvil -->
    <button
      v-if="isMobile"
      type="button"
      class="tbar-btn tbar-menu"
      aria-label="Abrir menú"
      @click="layoutStore.openDrawer()"
    >
      <i class="pi pi-bars" />
    </button>

    <!-- Toggle sidebar: solo desktop -->
    <button
      v-else
      type="button"
      class="tbar-btn tbar-sidebar-toggle"
      :aria-label="layoutStore.isSidebarCollapsed ? 'Expandir menú' : 'Colapsar menú'"
      v-tooltip.right="layoutStore.isSidebarCollapsed ? 'Expandir menú' : 'Colapsar menú'"
      @click="layoutStore.toggleSidebar()"
    >
      <i
        :class="
          layoutStore.isSidebarCollapsed ? 'pi pi-chevron-right' : 'pi pi-chevron-left'
        "
      />
    </button>

    <div class="search-wrap" :class="{ 'search-wrap--hidden-mobile': isMobile }">
      <i class="pi pi-search search-ic" />
      <input
        v-model="searchQuery"
        type="text"
        class="search-inp"
        placeholder="Buscar recursos, alumnos..."
      />
    </div>

    <div class="topbar-right">
      <button
        v-if="!isMobile"
        class="tbar-btn"
        aria-label="Buscar"
      >
        <i class="pi pi-search" />
      </button>

      <!-- DUA: Toggle tema y fuente -->
      <div class="dua-toggles">
        <button
          class="tbar-btn tbar-a11y"
          :aria-label="`Tema ${dua.theme.value === 'dark' ? 'claro' : 'oscuro'}`"
          v-tooltip.bottom="dua.theme.value === 'dark' ? 'Tema claro' : 'Tema oscuro'"
          @click="dua.toggleTheme()"
        >
          <i :class="dua.theme.value === 'dark' ? 'pi pi-sun' : 'pi pi-moon'" />
        </button>
        <button
          class="tbar-btn tbar-a11y"
          aria-label="Cambiar tamaño de fuente"
          v-tooltip.bottom="`Fuente: ${fontLabel}`"
          @click="dua.cycleFontSize()"
        >
          <i class="pi pi-sliders-h" />
        </button>
      </div>

      <button class="tbar-btn" aria-label="Notificaciones">
        <i class="pi pi-bell" />
      </button>

      <div class="topbar-user" :class="{ 'topbar-user--compact': isMobile }">
        <div v-if="!isMobile" class="user-text">
          <span class="uname">Pedro San Martín</span>
          <span class="urole">Docente Senior</span>
        </div>
        <img
          src="https://i.pravatar.cc/150?img=12"
          alt="Avatar"
          class="user-avatar"
        />
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useLayoutStore } from "@/store/layout";
import { useScreen } from "@/composables/useScreen";
import { useDUA } from "@/composables/useDUA";

const layoutStore = useLayoutStore();
const { isMobile } = useScreen();
const dua = useDUA();
const searchQuery = ref("");

const fontLabel = computed(() => {
  const labels: Record<string, string> = { small: "Pequeña", medium: "Mediana", large: "Grande" };
  return labels[dua.fontSize.value] ?? dua.fontSize.value;
});
</script>

<style scoped>
.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1rem;
  gap: 0.75rem;
  background: #ffffff;
  border-bottom: 1px solid #e2e8f0;
  position: sticky;
  top: 0;
  z-index: 10;
  box-sizing: border-box;
}

@media (min-width: 1024px) {
  .topbar {
    padding: 0.75rem 2rem;
  }
}

.search-wrap {
  flex: 1;
  max-width: 420px;
  position: relative;
  display: flex;
  align-items: center;
  min-width: 0;
}

.search-wrap--hidden-mobile {
  display: none;
}

@media (min-width: 640px) {
  .search-wrap--hidden-mobile {
    display: flex;
  }
}

.search-ic {
  position: absolute;
  left: 0.875rem;
  color: #94a3b8;
  font-size: 0.875rem;
  pointer-events: none;
}

.search-inp {
  width: 100%;
  padding: 0.5rem 1rem 0.5rem 2.25rem;
  background: #f1f5f9;
  border: 1px solid #e2e8f0;
  border-radius: 2rem;
  color: #0f172a;
  font-size: 0.875rem;
  outline: none;
  transition: border-color 0.15s;
}

.search-inp:focus {
  border-color: #ff9800;
}

.topbar-right {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  flex-shrink: 0;
}

.tbar-btn {
  min-width: 44px;
  min-height: 44px;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: none;
  background: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #64748b;
  font-size: 1rem;
  transition: background 0.15s;
}

.tbar-btn:hover {
  background: #f1f5f9;
}

.tbar-a11y {
  color: #ff9800;
}

.tbar-a11y:hover {
  color: #e65100;
}

.tbar-menu {
  color: #64748b;
}

.tbar-menu:hover {
  color: #ff9800;
}

.tbar-sidebar-toggle {
  margin-right: 0.25rem;
  flex-shrink: 0;
  color: #64748b;
}

.tbar-sidebar-toggle:hover {
  color: #ff9800;
}

.dua-toggles {
  display: flex;
  align-items: center;
  gap: 0.125rem;
}

.topbar-user {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding-left: 0.875rem;
  border-left: 1px solid #e2e8f0;
  margin-left: 0.25rem;
}

.topbar-user--compact {
  padding-left: 0.5rem;
  margin-left: 0;
  border-left: none;
}

.user-text {
  text-align: right;
}

.uname {
  display: block;
  font-weight: 600;
  font-size: 0.875rem;
  color: #0f172a;
  line-height: 1.3;
}

.urole {
  display: block;
  font-size: 0.75rem;
  color: #64748b;
  line-height: 1.3;
}

.user-avatar {
  width: 40px;
  height: 40px;
  min-width: 40px;
  min-height: 40px;
  border-radius: 50%;
  object-fit: cover;
}
</style>
