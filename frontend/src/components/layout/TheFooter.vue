<template>
  <footer class="main-footer">
    <div class="footer-inner">
      <div class="footer-brand">
        <img
          src="@/assets/logo_escuela_viva_sf_tt.svg"
          alt="Escuela Viva"
          class="footer-logo"
        />
        <span class="footer-tagline">Educación que inspira</span>
      </div>
      <div class="footer-links">
        <a href="#" class="footer-link">Ayuda</a>
        <a href="#" class="footer-link">Privacidad</a>
        <a href="#" class="footer-link">Términos</a>
      </div>
      <div class="footer-meta">
        <span class="footer-copy">© {{ new Date().getFullYear() }} EscuelaViva</span>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
</script>

<style scoped>
.main-footer {
  flex-shrink: 0;
  background: #ffffff;
  border-top: 1px solid var(--ev-border, #e2e8f0);
  padding: 0.875rem 2rem;
  box-shadow: 0 -1px 3px rgba(0, 0, 0, 0.04);
}
.footer-inner {
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  flex-wrap: wrap;
}
.footer-brand {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.footer-logo {
  height: 24px;
  width: auto;
  display: block;
}
.footer-tagline {
  font-size: 0.75rem;
  color: var(--ev-text-secondary, #64748b);
  font-weight: 500;
}
.footer-links {
  display: flex;
  align-items: center;
  gap: 1.25rem;
}
.footer-link {
  font-size: 0.8125rem;
  color: var(--ev-text-secondary, #64748b);
  text-decoration: none;
  transition: color 0.15s;
}
.footer-link:hover {
  color: var(--ev-primary, #ff9800);
}
.footer-meta {
  font-size: 0.75rem;
  color: var(--ev-text-secondary, #64748b);
}
.footer-copy {
  white-space: nowrap;
}
</style>
