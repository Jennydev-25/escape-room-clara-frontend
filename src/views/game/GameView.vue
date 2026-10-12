<script setup>
import wallpaper from '@/assets/images/game/desktop/wallpaper.webp'
</script>

<template>
    <main class="theme-clara-os relative min-h-dvh overflow-hidden bg-surface font-body text-on-surface">
        <img :src="wallpaper" alt="" aria-hidden="true" class="absolute inset-0 h-full w-full object-cover">
        <div class="absolute inset-0 bg-surface/60" aria-hidden="true"></div>

        <h1 class="sr-only">Escritorio de ClaraOS</h1>
    </main>
</template>
