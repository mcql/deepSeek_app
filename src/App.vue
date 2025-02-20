<template>
  <section class="app">
    <openAi />
    <router-view />
  </section>
</template>

<script setup>
import openAi from './components/openAi.vue'
</script>

<style scoped>
.app {
  width: 100vw;
  height: 100vh;
}
</style>