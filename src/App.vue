<script setup lang="ts">

import HomeView from './views/HomeView.vue';
import { useStore } from '@/stores/store';
import { storeToRefs } from 'pinia';
import ThemeToggle from '@/components/ThemeToggle.vue';
const store = useStore()
const { isDarkTheme } = storeToRefs(store)

</script>

<template>
  <div class="wrapper" :class="{ dark: isDarkTheme }">
    <ThemeToggle/>
    <HomeView />
  </div>
</template>

<style>
@import '@/assets/base.css';
.wrapper {
  clear: both;
  color: var(--color);
  background-color: var(--background);
  min-height: 100vh;
}
</style>
