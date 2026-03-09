<template>
  <div class="sidebar-content">
    <div class="sidebar-logo">
      <div class="logo-box">
        <img
          src="@/assets/logo_escuela_viva_sf_tt.svg"
          alt="EscuelaViva"
          class="logo-img"
        />
      </div>
    </div>

    <nav class="sidebar-nav">
      <a
        v-for="item in navItems"
        :key="item.id"
        class="nav-item"
        :class="{ active: activeNav === item.id }"
        v-tooltip.right="item.label"
        @click="handleNavClick(item.id)"
      >
        <i :class="`pi ${item.icon}`" />
        <span class="nav-item-label">{{ item.label }}</span>
      </a>
    </nav>

    <div class="sidebar-dua">
      <button
        type="button"
        class="nav-item dua-toggle"
        aria-label="Alternar tema"
        @click="onToggleTheme"
      >
        <i :class="theme === 'dark' ? 'pi pi-sun' : 'pi pi-moon'" />
        <span class="nav-item-label">{{ theme === "dark" ? "Tema claro" : "Tema oscuro" }}</span>
      </button>
      <button
        type="button"
        class="nav-item dua-toggle"
        aria-label="Cambiar tamaño de fuente"
        @click="onCycleFont"
      >
        <i class="pi pi-sliders-h" />
        <span class="nav-item-label">Fuente: {{ fontLabel }}</span>
      </button>
    </div>

    <div class="sidebar-footer">
      <button
        class="logout-btn"
        aria-label="Cerrar Sesión"
        v-tooltip.right="'Cerrar Sesión'"
        @click="handleLogout"
      >
        <i class="pi pi-sign-out" />
        <span class="logout-btn-label">Cerrar Sesión</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/store/auth";
import { useLayoutStore } from "@/store/layout";
import { useDUA } from "@/composables/useDUA";

const router = useRouter();
const authStore = useAuthStore();
const layoutStore = useLayoutStore();
const { theme, fontSize, toggleTheme, cycleFontSize } = useDUA();

const fontLabel = computed(() => {
  const labels: Record<string, string> = { small: "Pequeña", medium: "Mediana", large: "Grande" };
  return labels[fontSize.value] ?? fontSize.value;
});

const activeNav = ref("inicio");

const navItems = [
  { id: "inicio", label: "Inicio", icon: "pi-home" },
  { id: "ruta-ia", label: "Ruta IA", icon: "pi-sparkles" },
  { id: "microcursos", label: "Microcursos", icon: "pi-book" },
  { id: "panel-pie", label: "Panel PIE", icon: "pi-id-card" },
  { id: "edu-comunidad", label: "EduComunidad", icon: "pi-users" },
  { id: "calendario", label: "Calendario", icon: "pi-calendar" },
  { id: "logros", label: "Logros", icon: "pi-trophy" },
  { id: "biblioteca", label: "Biblioteca", icon: "pi-book" },
  { id: "mensajeria", label: "Mensajería", icon: "pi-envelope" },
  { id: "configuracion", label: "Configuración", icon: "pi-cog" },
];

function handleNavClick(id: string) {
  activeNav.value = id;
  layoutStore.closeDrawer();
}

function handleLogout() {
  authStore.logout();
  layoutStore.closeDrawer();
  router.push("/");
}

function onToggleTheme() {
  toggleTheme();
}

function onCycleFont() {
  cycleFontSize();
}
</script>

<style scoped>
.sidebar-content {
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 0;
  background: linear-gradient(
    175deg,
    var(--ev-surface-900, #1a1a2e) 0%,
    #1e1628 60%,
    #1b152a 100%
  );
}

.sidebar-logo {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.25rem 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  flex-shrink: 0;
}

.logo-box {
  width: 100%;
  max-width: 180px;
  height: 96px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.logo-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.sidebar-nav {
  flex: 1;
  padding: 0.875rem 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  overflow-y: auto;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.575rem 0.875rem;
  min-height: 44px;
  min-width: 44px;
  box-sizing: border-box;
  border-radius: 8px;
  color: rgba(255, 255, 255, 0.6);
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.15s;
  user-select: none;
  border: none;
  background: none;
  width: 100%;
  text-align: left;
}

.nav-item i {
  font-size: 0.95rem;
  width: 1rem;
  text-align: center;
  flex-shrink: 0;
}

.nav-item-label {
  color: rgba(255, 255, 255, 0.6);
  white-space: nowrap;
  overflow: hidden;
}

.nav-item:hover {
  background: rgba(255, 255, 255, 0.07);
  color: #fff;
}

.nav-item:hover .nav-item-label {
  color: #fff;
}

.nav-item.active {
  background: #ff9800;
}

.nav-item.active,
.nav-item.active .nav-item-label {
  color: #fff;
  font-weight: 600;
}

.sidebar-dua {
  padding: 0 0.75rem 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  padding-top: 0.5rem;
}

.dua-toggle .nav-item-label {
  text-transform: capitalize;
}

.sidebar-footer {
  padding: 0.875rem 0.75rem 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  flex-shrink: 0;
}

.logout-btn {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 0.75rem;
  padding: 0.575rem 0.875rem;
  min-height: 44px;
  border-radius: 8px;
  background: rgba(239, 68, 68, 0.12);
  border: 1px solid rgba(239, 68, 68, 0.2);
  color: #fca5a5;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 500;
  width: 100%;
  transition: all 0.15s;
}

.logout-btn:hover {
  background: rgba(239, 68, 68, 0.22);
  color: #fee2e2;
}

.logout-btn-label {
  color: inherit;
}
</style>
