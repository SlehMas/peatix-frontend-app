<style scoped>
.spinner {
    font-size: 2.5rem;
    width: 1em;
    height: 1em;
    fill: transparent;
    stroke: var(--color);
    stroke-width: 4;
    stroke-linecap: round;
    stroke-dasharray: 125;
    animation: spinner 4s linear infinite;
}

@keyframes spinner {
    0% {
        stroke-dashoffset: 25;
        transform: rotate(0deg);
    }

    50% {
        stroke-dashoffset: 125;
        transform: rotate(720deg);
    }

    100% {
        stroke-dashoffset: 25;
        transform: rotate(1080deg);
    }
}

.spinner>circle {
    fill: transparent;
}
</style>
<script setup lang="ts"></script>
<template>
    <div class="content fullheight centerpage">
        <svg class="spinner" viewBox="0 0 40 40">
            <circle cx="20" cy="20" r="18"></circle>
        </svg>
    </div>
</template>