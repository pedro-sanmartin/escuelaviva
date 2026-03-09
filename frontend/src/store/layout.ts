import { defineStore } from "pinia";

export const useLayoutStore = defineStore("layout", {
  state: () => ({
    isSidebarCollapsed: false,
    /** Drawer móvil: visible solo en <1024px */
    drawerOpen: false,
  }),
  actions: {
    toggleSidebar() {
      this.isSidebarCollapsed = !this.isSidebarCollapsed;
    },
    openDrawer() {
      this.drawerOpen = true;
    },
    closeDrawer() {
      this.drawerOpen = false;
    },
    toggleDrawer() {
      this.drawerOpen = !this.drawerOpen;
    },
  },
});
