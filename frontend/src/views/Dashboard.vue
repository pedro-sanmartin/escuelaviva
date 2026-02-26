<template>
  <div
    class="dashboard"
    :style="{ '--sidebar-width': isSidebarCollapsed ? '80px' : '260px' }"
  >
    <!-- ═══════════ SIDEBAR ═══════════ -->
    <aside
      class="sidebar"
      :class="{ 'sidebar--collapsed': isSidebarCollapsed }"
    >
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
          @click="activeNav = item.id"
        >
          <i :class="`pi ${item.icon}`" />
          <span class="nav-item-label">{{ item.label }}</span>
        </a>
      </nav>

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
    </aside>

    <!-- ═══════════ ÁREA PRINCIPAL ═══════════ -->
    <div class="main-area">
      <!-- ── Top Bar ── -->
      <header class="topbar">
        <button
          type="button"
          class="tbar-btn tbar-sidebar-toggle"
          :aria-label="isSidebarCollapsed ? 'Expandir menú' : 'Colapsar menú'"
          v-tooltip.right="
            isSidebarCollapsed ? 'Expandir menú' : 'Colapsar menú'
          "
          @click="isSidebarCollapsed = !isSidebarCollapsed"
        >
          <i
            :class="
              isSidebarCollapsed ? 'pi pi-chevron-right' : 'pi pi-chevron-left'
            "
          />
        </button>
        <div class="search-wrap">
          <i class="pi pi-search search-ic" />
          <input
            v-model="searchQuery"
            type="text"
            class="search-inp"
            placeholder="Buscar recursos, alumnos..."
          />
        </div>
        <div class="topbar-right">
          <button class="tbar-btn" aria-label="Buscar">
            <i class="pi pi-search" />
          </button>
          <button class="tbar-btn tbar-a11y" aria-label="Accesibilidad DUA">
            <i class="pi pi-sliders-h" />
          </button>
          <button class="tbar-btn" aria-label="Notificaciones">
            <i class="pi pi-bell" />
          </button>
          <div class="topbar-user">
            <div class="user-text">
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

      <!-- ── Contenido ── -->
      <div class="content">
        <div class="bento">
          <!-- ─── Columna Principal ─── -->
          <div class="col-main">
            <!-- Banner de Bienvenida -->
            <div class="card welcome-card">
              <div class="welcome-body">
                <h2 class="welcome-h">¡Hola, Pedro! <span>👋</span></h2>
                <p class="welcome-p">
                  Tu ecosistema educativo está listo para el día de hoy.<br />
                  Tienes 4 clases programadas, 2 reportes PIE pendientes y 1
                  reunión de coordinación.
                </p>
                <button class="ev-btn-primary" @click="() => {}">
                  <i class="pi pi-compass" />
                  <span>Explorar Recursos</span>
                </button>
              </div>
              <div class="welcome-img-wrap">
                <img
                  src="https://images.unsplash.com/photo-1577896851231-70ef18881754?w=400&q=80&auto=format&fit=crop"
                  alt="Docente"
                  class="welcome-img"
                />
              </div>
            </div>

            <!-- Fila Media -->
            <div class="mid-row">
              <!-- Alertas Panel PIE -->
              <div class="card">
                <div class="card-hdr">
                  <i class="pi pi-list-check card-hdr-ic" />
                  <span class="card-title">Alertas Panel PIE</span>
                  <span class="pill-orange">2</span>
                  <a class="link-action">Ver todo</a>
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

              <!-- EduComunidad -->
              <div class="card edu-card">
                <div class="card-hdr">
                  <span class="card-title">EduComunidad</span>
                  <i class="pi pi-comments card-hdr-ic-r" />
                </div>
                <p class="edu-sub">Conversaciones activas en tu red docente.</p>
                <div class="av-stack">
                  <img
                    v-for="av in communityAvatars"
                    :key="av.id"
                    :src="av.img"
                    :alt="`Miembro ${av.id}`"
                    class="av-item"
                  />
                  <span class="av-more">+12</span>
                </div>
                <button class="ev-btn-outline chat-btn">
                  <i class="pi pi-comments" />
                  <span>Unirse al Chat</span>
                </button>
              </div>

              <!-- Logros Recientes -->
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
            </div>
            <!-- / mid-row -->

            <!-- Mis Microcursos -->
            <div class="card microcursos-card">
              <div class="card-hdr">
                <span class="card-title section-t">Mis Microcursos</span>
                <a class="link-action">Ver todos</a>
              </div>
              <div class="cursos-grid">
                <div v-for="c in microcursos" :key="c.id" class="curso-card">
                  <div class="curso-img-wrap">
                    <img :src="c.img" :alt="c.nombre" class="curso-img" />
                    <span class="curso-pct">{{ c.pct }}%</span>
                  </div>
                  <div class="curso-body">
                    <div :class="['curso-icon', c.color]">
                      <i :class="`pi ${c.icon}`" />
                    </div>
                    <p class="curso-name">{{ c.nombre }}</p>
                    <p class="curso-desc">{{ c.desc }}</p>
                    <div class="prog-track">
                      <div class="prog-bar" :style="{ width: `${c.pct}%` }" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- / col-main -->

          <!-- ─── Columna Derecha ─── -->
          <div class="col-right">
            <!-- Ruta IA -->
            <div class="card ruta-card">
              <div class="card-hdr">
                <span class="card-title">Ruta IA</span>
                <i class="pi pi-bolt card-hdr-ic-orange" />
              </div>
              <!-- Sparkline SVG -->
              <div class="sparkline-wrap">
                <svg
                  viewBox="0 0 200 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  class="sparkline"
                >
                  <path
                    d="M0,38 C15,38 20,28 35,22 S55,8 70,14 S90,30 105,22 S130,6 145,10 S165,18 180,12 L200,8"
                    stroke="#FF9800"
                    stroke-width="2.5"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <circle cx="200" cy="8" r="4" fill="#FF9800" />
                </svg>
              </div>
              <div class="ruta-bottom">
                <span class="ruta-pct">68%</span>
                <div class="ruta-labels">
                  <div>
                    <p class="ruta-key">PROGRESO</p>
                    <p class="ruta-key">ACTUAL</p>
                  </div>
                  <div class="ruta-sep" />
                  <div>
                    <p class="ruta-next">Próximo: IA</p>
                    <p class="ruta-next">Generativa</p>
                  </div>
                </div>
              </div>
              <div class="prog-track ruta-track">
                <div class="prog-bar" style="width: 68%" />
              </div>
            </div>

            <!-- Recursos Recientes -->
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
                  <button class="dl-btn" :aria-label="`Descargar ${r.nombre}`">
                    <i class="pi pi-download" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <!-- / col-right -->
        </div>
        <!-- / bento -->
      </div>
      <!-- / content -->
    </div>
    <!-- / main-area -->

    <button class="help-fab" aria-label="Ayuda">
      <i class="pi pi-question-circle" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/store/auth";

const router = useRouter();
const authStore = useAuthStore();
const activeNav = ref("inicio");
const searchQuery = ref("");
const isSidebarCollapsed = ref(false);

const handleLogout = () => {
  authStore.logout();
  router.push("/");
};

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

const alertas = [
  {
    id: 1,
    titulo: "Validación NEE: Sofía González",
    sub: "Pendiente de firma directiva",
    tipo: "urgente",
    badge: "URGENTE",
  },
  {
    id: 2,
    titulo: "Actualización PIE: 2° Medio B",
    sub: "Reporte trimestral disponible",
    tipo: "pendiente",
    badge: "PENDIENTE",
  },
];

const communityAvatars = [
  { id: 1, img: "https://i.pravatar.cc/40?img=5" },
  { id: 2, img: "https://i.pravatar.cc/40?img=8" },
  { id: 3, img: "https://i.pravatar.cc/40?img=11" },
];

const logros = [
  {
    id: 1,
    nombre: "Mentor DUA",
    sub: "Obtenido hace 2 días",
    icon: "pi-star",
    color: "gold",
  },
  {
    id: 2,
    nombre: "7 Días Racha IA",
    sub: "(Sigue así)",
    icon: "pi-bolt",
    color: "primary",
  },
];

const microcursos = [
  {
    id: 1,
    nombre: "Estrategias DUA",
    pct: 75,
    icon: "pi-lightbulb",
    color: "orange",
    desc: "Diseña clases accesibles para todos los estudiantes.",
    img: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=240&fit=crop",
  },
  {
    id: 2,
    nombre: "Neurodiversidad",
    pct: 40,
    icon: "pi-sitemap",
    color: "blue",
    desc: "Comprende y acompaña las distintas formas de aprender.",
    img: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=400&h=240&fit=crop",
  },
  {
    id: 3,
    nombre: "Evaluación Inclusiva",
    pct: 90,
    icon: "pi-check-square",
    color: "green",
    desc: "Instrumentos y criterios de evaluación diversificada.",
    img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=280&fit=crop",
  },
  {
    id: 4,
    nombre: "TIC en el Aula",
    pct: 20,
    icon: "pi-desktop",
    color: "purple",
    desc: "Herramientas digitales para potenciar el aprendizaje.",
    img: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=240&fit=crop",
  },
];

const recursos = [
  {
    id: 1,
    nombre: "Guia DUA 2024.pdf",
    size: "2.4 MB",
    icon: "pi-file-pdf",
    color: "red",
  },
  {
    id: 2,
    nombre: "Manual PIE.pdf",
    size: "1.8 MB",
    icon: "pi-file-pdf",
    color: "blue",
  },
  {
    id: 3,
    nombre: "Protocolo Inclusión.docx",
    size: "850 KB",
    icon: "pi-file",
    color: "blue",
  },
  {
    id: 4,
    nombre: "Ajustes Curriculares NEE.pdf",
    size: "1.2 MB",
    icon: "pi-file-pdf",
    color: "red",
  },
  {
    id: 5,
    nombre: "Evaluación Diferenciada.docx",
    size: "620 KB",
    icon: "pi-file",
    color: "blue",
  },
  {
    id: 6,
    nombre: "Rúbricas DUA 2024.pdf",
    size: "3.1 MB",
    icon: "pi-file-pdf",
    color: "red",
  },
  {
    id: 7,
    nombre: "Calendario Escolar 2025.pdf",
    size: "450 KB",
    icon: "pi-file-pdf",
    color: "blue",
  },
  {
    id: 8,
    nombre: "Guía TIC en el Aula.pdf",
    size: "2.0 MB",
    icon: "pi-file-pdf",
    color: "red",
  },
];
</script>

<style scoped>
/* ════════════════════════════════════════
   LAYOUT PRINCIPAL
════════════════════════════════════════ */
.dashboard {
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

/* ════════════════════════════════════════
   SIDEBAR
════════════════════════════════════════ */
.sidebar {
  width: var(--sidebar-width, 260px);
  min-width: var(--sidebar-width, 260px);
  /* Degradado sutil: color de marca arriba → tono ligeramente más cálido/oscuro abajo */
  background: linear-gradient(
    175deg,
    var(--ev-surface-900, #1a1a2e) 0%,
    #1e1628 60%,
    #1b152a 100%
  );
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  height: 100vh;
  position: sticky;
  top: 0;
  overflow-x: hidden;
  overflow-y: auto;
  scrollbar-width: none;
  transition:
    width 0.3s ease,
    min-width 0.3s ease;
}
.sidebar::-webkit-scrollbar {
  display: none;
}

/* Logo */
.sidebar-logo {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.25rem 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  transition: padding 0.3s ease;
}
.sidebar--collapsed .sidebar-logo {
  padding: 1rem 0.5rem;
}

.logo-box {
  width: 100%;
  max-width: 180px;
  height: 96px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  overflow: hidden;
}
.sidebar--collapsed .logo-box {
  max-width: 48px;
  height: 48px;
}
.logo-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center;
  display: block;
}

/* Navegación */
.sidebar-nav {
  flex: 1;
  padding: 0.875rem 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.575rem 0.875rem;
  border-radius: 8px;
  color: rgba(255, 255, 255, 0.6) !important;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 500;
  text-decoration: none !important;
  transition: all 0.15s;
  user-select: none;
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
  transition: opacity 0.3s ease;
}
.nav-item:hover {
  background: rgba(255, 255, 255, 0.07);
}
.nav-item:hover .nav-item-label,
.nav-item:hover {
  color: #fff !important;
}
.nav-item.active {
  background: #ff9800;
}
.nav-item.active,
.nav-item.active .nav-item-label {
  color: #fff !important;
  font-weight: 600;
}
/* Sidebar colapsado: solo iconos centrados */
.sidebar--collapsed .sidebar-nav {
  padding: 0.875rem 0.5rem;
  align-items: center;
}
.sidebar--collapsed .nav-item {
  justify-content: center;
  padding: 0.575rem;
  width: 100%;
}
.sidebar--collapsed .nav-item .nav-item-label {
  display: none;
}
.sidebar--collapsed .nav-item i {
  width: auto;
  margin: 0;
}

/* Footer sidebar */
.sidebar-footer {
  padding: 0.875rem 0.75rem 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  transition: padding 0.3s ease;
}
.sidebar--collapsed .sidebar-footer {
  padding: 0.875rem 0.5rem 1rem;
}

.logout-btn {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 0.75rem;
  padding: 0.575rem 0.875rem;
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
.sidebar--collapsed .logout-btn {
  justify-content: center;
  padding: 0.575rem;
}
.sidebar--collapsed .logout-btn .logout-btn-label {
  display: none;
}

/* ════════════════════════════════════════
   ÁREA PRINCIPAL
════════════════════════════════════════ */
.main-area {
  display: flex;
  flex-direction: column;
  min-width: 0;
  min-height: 0;
  height: 100%;
  overflow: hidden;
  background: #f1f5f9;
}

/* ── Top Bar ── */
.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 2rem 0.75rem 2rem;
  background: #ffffff;
  border-bottom: 1px solid #e2e8f0;
  gap: 1rem;
  position: sticky;
  top: 0;
  z-index: 10;
  box-sizing: border-box;
}

.search-wrap {
  flex: 1;
  max-width: 420px;
  position: relative;
  display: flex;
  align-items: center;
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
}

.tbar-btn {
  width: 36px;
  height: 36px;
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
  color: #ff9800 !important;
}
.tbar-sidebar-toggle {
  margin-right: 0.25rem;
  flex-shrink: 0;
  color: #64748b;
}
.tbar-sidebar-toggle:hover {
  color: #ff9800;
}

.topbar-user {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding-left: 0.875rem;
  border-left: 1px solid #e2e8f0;
  margin-left: 0.25rem;
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
  border-radius: 50%;
  object-fit: cover;
}

/* ── Content ── */
.content {
  flex: 1;
  min-width: 0;
  min-height: 0;
  overflow-x: hidden;
  overflow-y: hidden;
  padding: 1.25rem 2rem;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}

/* ── Bento Grid ── */
.bento {
  flex: 1;
  min-width: 0;
  max-width: 100%;
  min-height: 0;
  display: grid;
  grid-template-columns: minmax(0, 1fr) 268px;
  gap: 1.25rem;
  align-items: stretch;
}

.col-main {
  display: grid;
  grid-template-rows: auto auto minmax(180px, 1fr);
  gap: 1.25rem;
  min-width: 0;
  min-height: 0;
}

.col-right {
  display: grid;
  grid-template-rows: auto minmax(200px, 1fr);
  gap: 1.25rem;
  min-width: 0;
  min-height: 0;
}

/* ── Card Base ── */
.card {
  background: #ffffff;
  border-radius: 16px;
  border: 1px solid #e2e8f0;
  padding: 1.25rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  min-width: 0;
}

/* Cards que rellenan el alto disponible */
.microcursos-card {
  display: flex;
  flex-direction: column;
  min-height: 0;
  padding: 1rem 1.25rem;
}
.microcursos-card .card-hdr {
  margin-bottom: 0.65rem;
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

/* ── Card Header ── */
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
.section-t {
  font-size: 1.0625rem;
}
.card-hdr-ic {
  color: #64748b;
  font-size: 0.875rem;
}
.card-hdr-ic-r {
  color: #64748b;
  font-size: 1rem;
}
.card-hdr-ic-orange {
  color: #ff9800;
  font-size: 1.1rem;
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
}

/* ════════════════════════════════════════
   BOTONES REUTILIZABLES
════════════════════════════════════════ */
.ev-btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: #ff9800;
  color: #fff;
  border: none;
  border-radius: 50px;
  padding: 0.625rem 1.375rem;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s;
}
.ev-btn-primary:hover {
  background: #fb8c00;
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
  padding: 0.55rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.15s;
  width: 100%;
}
.ev-btn-outline:hover {
  background: #f1f5f9;
}

/* ════════════════════════════════════════
   WELCOME CARD
════════════════════════════════════════ */
.welcome-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  padding: 1.75rem 2rem;
  min-height: 242px;
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
}
.welcome-img-wrap {
  flex-shrink: 0;
  width: 180px;
  height: 160px;
  border-radius: 12px;
  overflow: hidden;
}
.welcome-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* ════════════════════════════════════════
   MID ROW
════════════════════════════════════════ */
.mid-row {
  display: grid;
  grid-template-columns: 2fr 1.4fr 1.4fr;
  gap: 1.25rem;
}

/* Alertas */
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
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
}
.alert-tag.pendiente {
  background: rgba(59, 130, 246, 0.1);
  color: #3b82f6;
}

/* EduComunidad */
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
.chat-btn {
  margin-top: auto;
}

/* Logros */
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

/* ════════════════════════════════════════
   MICROCURSOS
════════════════════════════════════════ */
.microcursos-card .cursos-grid {
  flex: 1;
  min-height: 0;
  align-content: stretch;
}

.cursos-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.75rem;
  grid-auto-rows: 1fr;
}
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
.curso-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
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

/* ── Progress bar manual ── */
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

/* ════════════════════════════════════════
   RUTA IA
════════════════════════════════════════ */
.ruta-card {
  min-height: 228px;
}
.sparkline-wrap {
  margin: -0.25rem 0 0.5rem;
  overflow: hidden;
}
.sparkline {
  width: 100%;
  height: 48px;
  display: block;
}

.ruta-bottom {
  margin-bottom: 1rem;
}
.ruta-pct {
  display: block;
  font-size: 2.75rem;
  font-weight: 800;
  color: #ff9800;
  line-height: 1;
  margin-bottom: 0.625rem;
}
.ruta-labels {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}
.ruta-key {
  font-size: 0.6875rem;
  font-weight: 700;
  color: #64748b;
  margin: 0;
  line-height: 1.4;
  letter-spacing: 0.04em;
}
.ruta-sep {
  width: 1px;
  height: 2rem;
  background: #e2e8f0;
  flex-shrink: 0;
}
.ruta-next {
  font-size: 0.75rem;
  color: #64748b;
  margin: 0;
  line-height: 1.5;
}

.ruta-track {
  margin-top: 0.5rem;
  height: 8px;
}
.ruta-track .prog-bar {
  height: 8px;
}

/* ════════════════════════════════════════
   RECURSOS RECIENTES
════════════════════════════════════════ */
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
  width: 30px;
  height: 30px;
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
}
.dl-btn:hover {
  color: #ff9800;
  border-color: #ff9800;
}

/* ════════════════════════════════════════
   FAB
════════════════════════════════════════ */
.help-fab {
  position: fixed;
  bottom: 1.5rem;
  right: 1.5rem;
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
