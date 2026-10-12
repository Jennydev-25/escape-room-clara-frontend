<script setup>
import { Maximize, Minimize } from '@lucide/vue'
import { onMounted, onUnmounted, ref } from 'vue'
import wallpaper from '@/assets/images/game/desktop/wallpaper.webp'

// el navegador decide si deja pantalla completa (en iPhone no)
const canFullscreen = document.fullscreenEnabled === true

// se actualiza también al salir con Esc, no solo con el botón
const isFullscreen = ref(Boolean(document.fullscreenElement))

function syncFullscreen() {
    isFullscreen.value = Boolean(document.fullscreenElement)
}

onMounted(() => document.addEventListener('fullscreenchange', syncFullscreen))
onUnmounted(() => document.removeEventListener('fullscreenchange', syncFullscreen))

// entra o sale de pantalla completa según el estado actual
function toggleFullscreen() {
    if (document.fullscreenElement) {
        document.exitFullscreen()
    } else {
        document.documentElement.requestFullscreen()
    }
}
</script>

<template>
    <main class="theme-clara-os relative flex min-h-dvh flex-col overflow-hidden bg-surface font-body text-on-surface">
        <img :src="wallpaper" alt="" aria-hidden="true" class="absolute inset-0 h-full w-full object-cover">
        <div class="absolute inset-0 bg-surface/60" aria-hidden="true"></div>

        <h1 class="sr-only">Escritorio de ClaraOS</h1>

        <footer class="relative mt-auto flex items-center gap-3 border-t border-outline bg-surface-container/90 px-4 py-3 backdrop-blur-sm sm:px-6 md:py-2">
            <span class="size-2 shrink-0 animate-pulse rounded-full bg-primary motion-reduce:animate-none" aria-hidden="true"></span>
            <p class="min-w-0 truncate text-xs text-on-surface sm:text-sm"><span class="text-primary">ClaraOS</span> · Bienvenida de nuevo, Clara</p>
            <button
                v-if="canFullscreen"
                type="button"
                :aria-label="isFullscreen ? 'Salir de pantalla completa' : 'Pantalla completa'"
                @click="toggleFullscreen"
                class="ml-auto hidden size-7 shrink-0 items-center justify-center rounded-lg text-primary transition-colors hover:bg-surface-container-high focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary md:flex"
            >
                <Minimize v-if="isFullscreen" class="size-4" aria-hidden="true" />
                <Maximize v-else class="size-4" aria-hidden="true" />
            </button>
        </footer>
    </main>
</template>
