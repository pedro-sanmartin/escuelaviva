/**
 * Preset EscuelaViva para PrimeVue 4
 * Extiende Aura con nuestros Design Tokens
 */
import { definePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';

/* Paleta naranja #FF9800 (Material Design Orange) */
const escuelavivaPrimary = {
  50: '#fff3e0',
  100: '#ffe0b2',
  200: '#ffcc80',
  300: '#ffb74d',
  400: '#ffa726',
  500: '#FF9800',
  600: '#fb8c00',
  700: '#f57c00',
  800: '#ef6c00',
  900: '#e65100',
  950: '#bf360c',
};

export const EscuelaVivaPreset = definePreset(Aura, {
  semantic: {
    primary: escuelavivaPrimary,
    colorScheme: {
      dark: {
        surface: {
          900: '#1A1A2E',
          950: '#12121f',
        },
      },
    },
  },
  primitive: {
    borderRadius: {
      none: '0',
      xs: '2px',
      sm: '4px',
      md: '6px',
      lg: '12px',
      xl: '16px',
      '2xl': '24px',
    },
  },
});
