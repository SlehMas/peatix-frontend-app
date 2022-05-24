<script setup lang="ts">
import { useStore } from '@/stores/store';
import { storeToRefs } from 'pinia';

const store = useStore()

const { isDarkTheme } = storeToRefs(store)

function toggleDarkTheme() {
    store.setDarkTheme(!isDarkTheme.value)
    localStorage.setItem('theme', isDarkTheme.value ? 'dark' : 'light')
}
</script>

<template>
    <div class="p-4 switch">
        <span class="d-none d-sm-inline">Switch theme</span>
        <input @change="toggleDarkTheme" id="checkbox" type="checkbox" class="switch-checkbox" />
        <label for="checkbox" class="switch-label">
            <span>🌙</span>
            <span>☀️</span>
            <div class="switch-toggle" :class="{ 'switch-toggle-checked': isDarkTheme }"></div>
        </label>
    </div>
</template>

<style scoped>
.switch {
    position: absolute;
    right: 0;
}

.switch-checkbox {
    display: none;
}

.switch-label {
    /* for width, use the standard element-size */
    width: var(--dark-toggle-size);

    /* for other dimensions, calculate values based on it */
    border-radius: var(--dark-toggle-size);
    border: calc(var(--dark-toggle-size) * 0.025) solid var(--accent-color);
    padding: calc(var(--dark-toggle-size) * 0.1);
    font-size: calc(var(--dark-toggle-size) * 0.3);
    height: calc(var(--dark-toggle-size) * 0.35);

    align-items: center;
    background: var(--text-primary-color);
    cursor: pointer;
    display: flex;
    position: relative;
    transition: translate 0.5s ease;
    justify-content: space-between;
    z-index: 1;
}

.switch-toggle {
    position: absolute;
    background-color: var(--background);
    border-radius: 50%;
    top: calc(var(--dark-toggle-size) * -0.045);
    left: 0;
    height: calc(var(--dark-toggle-size) * 0.4);
    width: calc(var(--dark-toggle-size) * 0.4);
    transform: translateX(0);
    transition: transform 0.3s ease, background-color 0.5s ease;
}

.switch-toggle-checked {
    transform: translateX(calc(var(--dark-toggle-size) * 0.55)) !important;
}

@media (max-width: 400px) {
    .switch {
        position: relative;
    }
}
</style>