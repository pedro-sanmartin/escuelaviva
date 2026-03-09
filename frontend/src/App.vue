<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { useDUA } from "@/composables/useDUA";

// Inicializa preferencias DUA (fuente, tema) y aplica al <html>
useDUA();
</script>