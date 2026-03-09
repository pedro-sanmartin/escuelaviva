/**
 * Plugin Font Awesome para EscuelaViva.
 * Iconos centralizados para consistencia y mantenibilidad.
 */
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
import type { App } from "vue";

library.add(
  faBookOpen,
  faEnvelope,
  faLock,
  faRightToBracket,
  faExclamationCircle,
  faGraduationCap,
  faCircleCheck,
  faGoogle,
  faLinkedin
);

export function installFontAwesome(app: App) {
  app.component("FontAwesomeIcon", FontAwesomeIcon);
}
