<script setup>
import wallpaper from '@/assets/images/game/desktop/wallpaper.webp'
</script>

<template>
    <main class="theme-clara-os relative flex min-h-dvh flex-col overflow-hidden bg-surface font-body text-on-surface">
        <img :src="wallpaper" alt="" aria-hidden="true" class="absolute inset-0 h-full w-full object-cover">
        <div class="absolute inset-0 bg-surface/60" aria-hidden="true"></div>

        <h1 class="sr-only">Escritorio de ClaraOS</h1>

        <footer class="relative mt-auto flex items-center gap-3 border-t border-outline bg-surface-container/90 px-4 py-3 backdrop-blur-sm sm:px-6">
            <span class="size-2 shrink-0 animate-pulse rounded-full bg-primary motion-reduce:animate-none" aria-hidden="true"></span>
            <p class="min-w-0 truncate text-xs text-on-surface sm:text-sm"><span class="text-primary">ClaraOS</span> · Bienvenida de nuevo, Clara</p>
        </footer>
    </main>
</template>
