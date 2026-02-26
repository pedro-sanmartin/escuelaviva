<template>
  <div class="login-page">
    <div class="login-card">
      <!-- Columna izquierda: imagen 3D y texto (oculta en móvil) -->
      <div class="login-left">
        <img
          src="@/assets/figura-3d.png"
          alt="Escuela Viva"
          class="login-figura-3d"
        />
        <h2 class="login-brand">EscuelaViva</h2>
        <p class="login-tagline">
          Cultivando inteligencia a través de entornos de aprendizaje digital
          orgánicos y fluidos.
        </p>
      </div>

      <!-- Columna derecha: formulario -->
      <div class="login-right">
        <div class="login-form-header">
          <img
            src="@/assets/logo_escuela_viva_sf_tt.svg"
            alt="Escuela Viva"
            class="login-logo"
          />
        </div>

        <form @submit.prevent="handleLogin" class="login-form">
          <div class="form-group">
            <label for="email">Correo Electrónico</label>
            <InputText
              id="email"
              v-model="email"
              type="email"
              placeholder="name@escuelaviva.edu"
              required
              class="login-input"
            />
          </div>

          <div class="form-group">
            <div class="form-group-header">
              <label for="password">Contraseña</label>
              <a href="#" class="forgot-link">¿Olvidaste tu contraseña?</a>
            </div>
            <InputText
              id="password"
              v-model="password"
              type="password"
              placeholder="********"
              required
              class="login-input"
            />
          </div>

          <Button
            type="submit"
            :loading="isLoading"
            :disabled="isLoading"
            label="Iniciar Sesión"
            class="login-button"
            :pt="{
              root: {
                style:
                  'background: #FF9800 !important; border: none; color: white;',
              },
            }"
          />

          <Message
            v-if="errorMessage"
            severity="error"
            :closable="false"
            class="login-error"
          >
            <FontAwesomeIcon icon="exclamation-circle" class="message-icon" />
            {{ errorMessage }}
          </Message>

          <div class="login-divider">
            <span>O CONTINÚA CON</span>
          </div>

          <div class="social-buttons">
            <Button type="button" class="social-button" outlined>
              <FontAwesomeIcon :icon="['fab', 'google']" class="social-icon" />
              Google
            </Button>
            <Button type="button" class="social-button" outlined>
              <FontAwesomeIcon
                :icon="['fab', 'linkedin']"
                class="social-icon"
              />
              LinkedIn
            </Button>
          </div>
        </form>

        <div class="accessibility-row">
          <FontAwesomeIcon icon="circle-check" class="accessibility-icon" />
          <span class="accessibility-label">Inclusión y Accesibilidad</span>
          <div class="accessibility-toggle-wrap">
            <ToggleSwitch
              v-model="accessibilityEnabled"
              input-id="accessibility"
            />
          </div>
          <label for="accessibility" class="accessibility-status">
            {{ accessibilityEnabled ? "ACTIVADO" : "DESACTIVADO" }}
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/store/auth";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import Message from "primevue/message";
import ToggleSwitch from "primevue/toggleswitch";

const email = ref("");
const password = ref("");
const isLoading = ref(false);
const errorMessage = ref("");
const accessibilityEnabled = ref(true);

const router = useRouter();
const authStore = useAuthStore();

const handleLogin = async () => {
  isLoading.value = true;
  errorMessage.value = "";

  const result = await authStore.login(email.value, password.value);

  if (result.success) {
    router.push("/dashboard");
  } else {
    errorMessage.value =
      "Credenciales inválidas. Verifica tu correo y contraseña.";
  }

  isLoading.value = false;
};
</script>

<style scoped>
/* Mobile First */
.login-page {
  position: fixed;
  inset: 0;
  min-height: 100vh;
  min-height: 100dvh; /* viewport dinámico: se reduce con el teclado, habilita scroll */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background:
    radial-gradient(
      ellipse 120% 80% at 85% 5%,
      rgba(255, 152, 0, 0.09) 0%,
      transparent 55%
    ),
    #1a1a2e;
  padding: 1.5rem 5% max(2rem, env(safe-area-inset-bottom));
  overflow-y: auto;
  -webkit-overflow-scrolling: touch; /* scroll fluido en iOS */
  box-sizing: border-box;
}

.login-card {
  display: flex;
  flex-direction: column;
  width: 90%; /* w-[90%] en móvil */
  max-width: 420px;
  min-height: auto;
  background: rgba(255, 255, 255, 0.04);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border: none; /* Sin borde en móvil para que no se vea pequeña */
  border-radius: 1.5rem;
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.2),
    0 20px 40px -15px rgba(0, 0, 0, 0.35),
    0 40px 80px -30px rgba(0, 0, 0, 0.25);
  overflow: hidden;
}

/* Columna izquierda - oculta en móvil, visible desde 768px */
.login-left {
  display: none;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1.5rem 1rem;
  background: #1a1a2e;
}

.login-figura-3d {
  display: block;
  width: 100%;
  max-width: 160px;
  height: auto;
  max-height: 160px;
  object-fit: contain;
  margin: 0;
}

.login-brand {
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
  margin: -1rem 0 0.5rem;
  letter-spacing: -0.02em;
  text-align: center;
}

.login-tagline {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.85);
  text-align: center;
  line-height: 1.5;
  margin: 0;
  max-width: 320px;
}

/* Columna derecha - móvil: padding lateral */
.login-right {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 1.5rem 1rem 2rem;
}

.login-form-header {
  text-align: center;
  margin-bottom: 1.5rem;
  margin-top: -0.5rem;
}

.login-logo {
  display: block;
  width: 100%;
  max-width: 220px;
  height: auto;
  max-height: 120px;
  object-fit: contain;
  margin: 0 auto;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.form-group-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.form-group label {
  font-size: 0.875rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.9);
}

.forgot-link {
  font-size: 0.8rem;
  color: #64b5f6;
  text-decoration: none;
}

.forgot-link:hover {
  text-decoration: underline;
}

.login-input {
  width: 100%;
}

.login-input :deep(input),
.login-input :deep(.p-inputtext) {
  width: 100% !important;
  min-height: 44px;
  background: rgba(255, 255, 255, 0.08) !important;
  border: 1px solid rgba(255, 255, 255, 0.15) !important;
  color: white !important;
  border-radius: 0.5rem !important;
}

.login-input :deep(input::placeholder),
.login-input :deep(.p-inputtext::placeholder) {
  color: rgba(255, 255, 255, 0.4) !important;
}

.login-button {
  width: 100%;
  margin-top: 0.25rem;
}

.login-button :deep(button),
.login-button :deep(.p-button) {
  width: 100% !important;
  min-height: 44px;
  background: #ff9800 !important;
  background-color: #ff9800 !important;
  border: none !important;
  border-color: #ff9800 !important;
  color: white !important;
  font-weight: 600 !important;
  border-radius: 0.5rem !important;
}

.login-button :deep(button:hover),
.login-button :deep(.p-button:hover) {
  background: #fb8c00 !important;
  background-color: #fb8c00 !important;
  border-color: #fb8c00 !important;
}

.login-error {
  margin-top: 0;
}

.message-icon {
  margin-right: 0.5rem;
}

.login-divider {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 1rem 0 0.5rem;
}

.login-divider::before,
.login-divider::after {
  content: "";
  flex: 1;
  height: 1px;
  background: rgba(255, 255, 255, 0.2);
}

.login-divider span {
  font-size: 0.7rem;
  color: rgba(255, 255, 255, 0.5);
  letter-spacing: 0.05em;
}

.social-buttons {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.social-button {
  flex: 1;
}

.social-button :deep(button),
.social-button :deep(.p-button) {
  width: 100% !important;
  min-height: 44px;
  background: rgba(255, 255, 255, 0.06) !important;
  border: 1px solid rgba(255, 255, 255, 0.15) !important;
  color: white !important;
  justify-content: center !important;
  gap: 0.5rem !important;
  border-radius: 0.5rem !important;
}

.social-icon {
  font-size: 1rem;
}

.accessibility-row {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: auto;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

/* Área táctil amplia para el toggle (min 44px recomendado) */
.accessibility-toggle-wrap {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 48px;
  min-height: 48px;
  padding: 0.5rem;
  margin: -0.5rem;
}

.accessibility-toggle-wrap :deep(.p-toggleswitch) {
  width: 3rem;
  height: 1.75rem;
}

.accessibility-icon {
  color: #4caf50;
  font-size: 1rem;
}

.accessibility-label {
  flex: 1;
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.7);
}

@media (max-width: 767px) {
  .accessibility-row .accessibility-label {
    flex: none;
  }
}

.accessibility-status {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.5);
  letter-spacing: 0.05em;
}

/* Tablet - diseño móvil extendido hasta 1023px (3D oculta) */
@media (min-width: 640px) and (max-width: 1023px) {
  .login-page {
    align-items: center;
    padding: 1.25rem 1.5rem max(1.5rem, env(safe-area-inset-bottom));
    min-height: 100vh;
    min-height: 100dvh;
  }

  .login-card {
    width: 90%;
    max-width: 460px;
    flex-direction: column;
    border: 1px solid rgba(255, 255, 255, 0.08);
  }

  .login-right {
    padding: 2rem 1.5rem 2rem;
  }
}

/* Desktop (lg) - dos columnas y 3D visible solo desde 1024px */
@media (min-width: 1024px) {
  .login-page {
    align-items: center;
    padding: 1.5rem;
    min-height: 100vh;
    min-height: 100dvh;
  }

  .login-card {
    flex-direction: row;
    max-width: 900px;
    min-height: 520px;
  }

  .login-left {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex: 1;
    padding: 3rem 2rem;
    background: #1a1a2e;
  }

  .login-figura-3d {
    max-width: 320px;
    max-height: 320px;
  }

  .login-brand {
    font-size: 2rem;
  }

  .login-tagline {
    font-size: 0.9rem;
  }

  .login-right {
    flex: 1;
    padding: 2.5rem 2.5rem 2rem;
  }
}
</style>
