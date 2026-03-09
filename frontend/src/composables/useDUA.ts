/**
 * Composable DUA: accesibilidad reactiva.
 * Gestiona tamaño de fuente (small, medium, large) y tema (light/dark).
 * Persiste preferencias en localStorage y aplica clases/variables a <html>.
 * EscuelaViva - Documento Técnico: inclusión por diseño.
 */
import { ref, watch, onMounted } from "vue";
import {
  FONT_SIZE_DUA,
  DUA_FONT_CLASS,
  THEME_MODE,
  THEME_DARK_CLASS,
  type FontSizeDuaLevel,
  type ThemeMode,
} from "@/config/app.config";

const STORAGE_KEY_FONT = "ev-dua-font-size";
const STORAGE_KEY_THEME = "ev-dua-theme";

const FONT_LEVELS = Object.keys(FONT_SIZE_DUA) as FontSizeDuaLevel[];
const THEME_MODES = Object.values(THEME_MODE);

function readStoredFont(): FontSizeDuaLevel {
  const v = localStorage.getItem(STORAGE_KEY_FONT);
  if (v && FONT_LEVELS.includes(v as FontSizeDuaLevel)) return v as FontSizeDuaLevel;
  return "medium";
}

function readStoredTheme(): ThemeMode {
  const v = localStorage.getItem(STORAGE_KEY_THEME);
  if (v && THEME_MODES.includes(v as ThemeMode)) return v as ThemeMode;
  return "dark";
}

function applyFontToHtml(level: FontSizeDuaLevel): void {
  const html = document.documentElement;
  FONT_LEVELS.forEach((l) => html.classList.remove(DUA_FONT_CLASS[l]));
  html.classList.add(DUA_FONT_CLASS[level]);
}

function applyThemeToHtml(mode: ThemeMode): void {
  const html = document.documentElement;
  if (mode === "dark") {
    html.classList.add(THEME_DARK_CLASS);
  } else {
    html.classList.remove(THEME_DARK_CLASS);
  }
}

/**
 * Composable para preferencias DUA (tamaño de fuente y tema).
 * Aplica cambios al <html> y persiste en localStorage.
 */
export function useDUA() {
  const fontSize = ref<FontSizeDuaLevel>(readStoredFont());
  const theme = ref<ThemeMode>(readStoredTheme());

  function setFontSize(level: FontSizeDuaLevel): void {
    fontSize.value = level;
    localStorage.setItem(STORAGE_KEY_FONT, level);
    applyFontToHtml(level);
  }

  function setTheme(mode: ThemeMode): void {
    theme.value = mode;
    localStorage.setItem(STORAGE_KEY_THEME, mode);
    applyThemeToHtml(mode);
  }

  function cycleFontSize(): FontSizeDuaLevel {
    const idx = FONT_LEVELS.indexOf(fontSize.value);
    const next = FONT_LEVELS[(idx + 1) % FONT_LEVELS.length];
    setFontSize(next);
    return next;
  }

  function toggleTheme(): ThemeMode {
    const next = theme.value === "dark" ? "light" : "dark";
    setTheme(next);
    return next;
  }

  watch(fontSize, applyFontToHtml, { immediate: false });
  watch(theme, applyThemeToHtml, { immediate: false });

  onMounted(() => {
    applyFontToHtml(fontSize.value);
    applyThemeToHtml(theme.value);
  });

  return {
    fontSize,
    theme,
    setFontSize,
    setTheme,
    cycleFontSize,
    toggleTheme,
    /** Valores disponibles para selectores UI */
    fontLevels: FONT_LEVELS,
    themeModes: THEME_MODES,
  };
}
