import { ref, onMounted, onUnmounted } from "vue";

const BREAKPOINT_DESKTOP = 1024;

/**
 * Detecta si la pantalla es móvil o desktop según el breakpoint (1024px).
 * Reutilizable en cualquier vista o componente.
 */
export function useScreen() {
  const isMobile = ref(window.innerWidth < BREAKPOINT_DESKTOP);

  function update() {
    isMobile.value = window.innerWidth < BREAKPOINT_DESKTOP;
  }

  onMounted(() => {
    window.addEventListener("resize", update);
    update();
  });

  onUnmounted(() => {
    window.removeEventListener("resize", update);
  });

  return {
    isMobile,
  };
}
