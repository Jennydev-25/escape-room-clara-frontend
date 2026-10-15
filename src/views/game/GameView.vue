<script setup>
import { DoorOpen, Footprints, Maximize, Minimize, Trash2, X } from '@lucide/vue'
import { inject, onMounted, onUnmounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import FolderList from '@/components/game/FolderList.vue'
import PuzzleWindow from '@/components/game/PuzzleWindow.vue'
import TrashWindow from '@/components/game/TrashWindow.vue'
import WelcomeCard from '@/components/game/WelcomeCard.vue'
import { shouldOpenOnClick } from '@/composables/game/shouldOpenOnClick'
import LoadingScreen from '@/shared/LoadingScreen.vue'
import wallpaper from '@/assets/images/game/desktop/wallpaper.webp'

const router = useRouter()
const folderService = inject('FolderService')
const progressService = inject('ProgressService')
const puzzleService = inject('PuzzleService')
const currentPuzzle = ref(null)
const isComingSoon = ref(false)
const foldersKey = ref(0)
const isTrashOpen = ref(false)
const isWelcomeOpen = ref(true)
const isLeaving = ref(false)
const leavingProgress = ref(0)
let leavingTimer
let leavingTimeout

// hora del dispositivo en formato 24 h, sin segundos
const formatTime = (date) => date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', hourCycle: 'h23' })
const time = ref(formatTime(new Date()))

// se comprueba cada segundo para que el minuto cambie justo cuando toca
let clockTimer
onMounted(() => {
    clockTimer = setInterval(() => {
        time.value = formatTime(new Date())
    }, 1000)
})
onUnmounted(() => clearInterval(clockTimer))

// salir de ClaraOS: pantalla de carga con la barra subiendo como en App.vue
function leaveClaraOS() {
    isLeaving.value = true
    leavingTimer = setInterval(() => {
        if (leavingProgress.value < 90) leavingProgress.value += 15
    }, 100)
    leavingTimeout = setTimeout(() => {
        clearInterval(leavingTimer)
        leavingProgress.value = 100
        router.push('/resumen')
    }, 800)
}
onUnmounted(() => {
    clearInterval(leavingTimer)
    clearTimeout(leavingTimeout)
})

// busca entre las carpetas visibles el puzzle con pregunta del capítulo actual
async function openCurrentPuzzle() {
    const progress = await progressService.getProgress()
    const folders = await folderService.listFolders()
    const details = await Promise.all(folders.map((folder) => folderService.getFolder(folder.getCode())))
    const summaries = details.flatMap((detail) => detail.getPuzzles())
    const puzzles = await Promise.all(summaries.map((summary) => puzzleService.getPuzzle(summary.getId())))
    const index = puzzles.findIndex((puzzle) => puzzle.getMinChapter() === progress.getCurrentChapter() && puzzle.getQuestion())
    isComingSoon.value = index === -1
    if (isComingSoon.value) {
        return
    }
    currentPuzzle.value = { id: summaries[index].getId(), title: summaries[index].getTitle(), question: puzzles[index].getQuestion() }
}

// al acertar se cierra la ventana y se recargan las carpetas para ver las nuevas
function onSolved() {
    currentPuzzle.value = null
    foldersKey.value++
}

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
    <main class="theme-clara-os relative flex h-dvh flex-col overflow-hidden bg-surface font-body text-on-surface">
        <img :src="wallpaper" alt="" aria-hidden="true" class="absolute inset-0 h-full w-full object-cover">
        <div class="absolute inset-0 bg-surface/60" aria-hidden="true"></div>

        <h1 class="sr-only">Escritorio de ClaraOS</h1>

        <FolderList :key="foldersKey" class="relative min-h-0 flex-1" />

        <div class="absolute top-0 right-0 flex items-center gap-2 p-3 sm:p-4">
            <time class="inline-flex items-center gap-1.5 rounded-full border border-outline/30 px-5 py-2 font-label text-xl uppercase tracking-widest text-on-surface-variant">{{ time }}</time>
            <button
                type="button"
                aria-label="Salir de ClaraOS"
                @click="leaveClaraOS"
                class="group inline-flex items-center gap-2 rounded-full border border-outline/30 px-4 py-2 font-label text-sm uppercase tracking-widest text-on-surface-variant/60 transition-colors hover:border-error focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
                <DoorOpen class="size-6 text-error" aria-hidden="true" />
                <span class="hidden text-on-surface-variant group-hover:inline group-focus-visible:inline">Salir de <span class="text-primary">ClaraOS</span></span>
            </button>
        </div>

        <div class="relative mt-auto flex justify-end p-4 sm:p-6">
            <button
                type="button"
                class="flex w-16 flex-col items-center gap-1 rounded-2xl p-2 text-center text-xs font-medium tracking-wide text-on-surface uppercase transition-colors hover:bg-surface-container/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:w-20"
                @click="shouldOpenOnClick($event) && (isTrashOpen = true)"
                @dblclick="isTrashOpen = true"
            >
                <Trash2 class="size-9 fill-on-surface-variant/20 text-on-surface-variant sm:size-10" aria-hidden="true" />
                <span>Papelera</span>
            </button>
        </div>

        <footer class="relative grid grid-cols-[1fr_auto_1fr] items-center gap-3 border-t border-outline bg-surface-container/90 px-4 py-3 backdrop-blur-sm sm:px-6 md:py-2">
            <div class="flex min-w-0 items-center gap-3">
                <span class="size-2 shrink-0 animate-pulse rounded-full bg-primary motion-reduce:animate-none" aria-hidden="true"></span>
                <p class="min-w-0 truncate text-xs text-on-surface sm:text-sm"><span class="text-primary">ClaraOS</span> · Bienvenida de nuevo, Clara</p>
            </div>
            <button
                type="button"
                aria-label="Siguiente capítulo"
                @click="openCurrentPuzzle"
                class="group flex h-7 items-center gap-2 rounded-lg px-2 text-xs font-medium tracking-wide text-os-clue uppercase transition-colors hover:bg-surface-container-high focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-os-clue"
            >
                <Footprints class="size-4" aria-hidden="true" />
                <span class="hidden group-hover:inline group-focus-visible:inline">Siguiente capítulo</span>
            </button>
            <button
                v-if="canFullscreen"
                type="button"
                :aria-label="isFullscreen ? 'Salir de pantalla completa' : 'Pantalla completa'"
                @click="toggleFullscreen"
                class="hidden size-7 justify-self-end shrink-0 items-center justify-center rounded-lg text-primary transition-colors hover:bg-surface-container-high focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary md:flex"
            >
                <Minimize v-if="isFullscreen" class="size-4" aria-hidden="true" />
                <Maximize v-else class="size-4" aria-hidden="true" />
            </button>
        </footer>

        <div v-if="isComingSoon" role="alert" class="fixed top-1/2 left-1/2 flex w-max max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 items-center justify-between gap-3 rounded-2xl border border-os-clue bg-surface-container px-4 py-3 text-sm text-on-surface uppercase">
            <p>Próximamente...</p>
            <button
                type="button"
                class="flex size-8 shrink-0 items-center justify-center rounded-full text-on-surface-variant transition-colors hover:bg-white/15 hover:text-on-surface active:bg-white/25 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                aria-label="Cerrar aviso"
                @click="isComingSoon = false"
            >
                <X class="size-5" aria-hidden="true" />
            </button>
        </div>

        <WelcomeCard v-if="isWelcomeOpen" @close="isWelcomeOpen = false" />
        <TrashWindow v-if="isTrashOpen" @close="isTrashOpen = false" />
        <PuzzleWindow v-if="currentPuzzle" v-bind="currentPuzzle" @close="currentPuzzle = null" @solved="onSolved" />
        <LoadingScreen v-if="isLeaving" title="Volviendo..." message="Saliendo del sistema de ClaraOS" :progress="leavingProgress" />
    </main>
</template>
