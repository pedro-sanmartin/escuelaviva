// src/main.ts

import { createApp } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faBookOpen,
  faEnvelope,
  faLock,
  faRightToBracket,
  faExclamationCircle,
  faGraduationCap,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";
import { faGoogle, faLinkedin } from "@fortawesome/free-brands-svg-icons";
// Agregar más iconos según el estilo:
// Solid:   import faX from '@fortawesome/free-solid-svg-icons'
// Regular: import faX from '@fortawesome/free-regular-svg-icons'
// Brands:  import faGoogle from '@fortawesome/free-brands-svg-icons'
// Luego: library.add(...). Uso: <FontAwesomeIcon icon="x" /> o icon="['fab','google']" para brands

import "primeicons/primeicons.css";
import PrimeVue from "primevue/config";
import Tooltip from "primevue/tooltip";
import { EscuelaVivaPreset } from "./styles/theme";
import App from "./App.vue";
import router from "./router";
import pinia from "./store";

library.add(
  faBookOpen,
  faEnvelope,
  faLock,
  faRightToBracket,
  faExclamationCircle,
  faGraduationCap,
  faCircleCheck,
  faGoogle,
  faLinkedin,
);

const app = createApp(App);
app.component("FontAwesomeIcon", FontAwesomeIcon);

app.directive("tooltip", Tooltip);
app.use(PrimeVue, {
  theme: {
    preset: EscuelaVivaPreset,
    options: {
      prefix: "p",
      darkModeSelector: "system",
      cssLayer: {
        name: "primevue",
        order: "theme, base, primevue",
      },
    },
  },
});
app.use(pinia);
app.use(router);

app.mount("#app");
