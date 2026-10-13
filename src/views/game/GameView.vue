<script setup>
import { Footprints, Maximize, Minimize, Trash2, X } from '@lucide/vue'
import { inject, onMounted, onUnmounted, ref } from 'vue'
import FolderList from '@/components/game/FolderList.vue'
import PuzzleWindow from '@/components/game/PuzzleWindow.vue'
import wallpaper from '@/assets/images/game/desktop/wallpaper.webp'

const folderService = inject('FolderService')
const progressService = inject('ProgressService')
const puzzleService = inject('PuzzleService')
const currentPuzzle = ref(null)
const isComingSoon = ref(false)
const foldersKey = ref(0)

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

        <div class="relative mt-auto flex justify-end p-4 sm:p-6">
            <button
                type="button"
                class="flex w-16 flex-col items-center gap-1 rounded-2xl p-2 text-center text-xs font-medium tracking-wide text-on-surface uppercase transition-colors hover:bg-surface-container/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:w-20"
            >
                <Trash2 class="size-9 fill-on-surface-variant/20 text-on-surface-variant sm:size-10" aria-hidden="true" />
                <span>Papelera</span>
            </button>
        </div>

        <footer class="relative flex items-center gap-3 border-t border-outline bg-surface-container/90 px-4 py-3 backdrop-blur-sm sm:px-6 md:py-2">
            <span class="size-2 shrink-0 animate-pulse rounded-full bg-primary motion-reduce:animate-none" aria-hidden="true"></span>
            <p class="min-w-0 truncate text-xs text-on-surface sm:text-sm"><span class="text-primary">ClaraOS</span> · Bienvenida de nuevo, Clara</p>
            <button
                type="button"
                aria-label="Siguiente capítulo"
                @click="openCurrentPuzzle"
                class="group absolute left-1/2 flex h-7 -translate-x-1/2 items-center gap-2 rounded-lg px-2 text-xs font-medium tracking-wide text-os-clue uppercase transition-colors hover:bg-surface-container-high focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-os-clue"
            >
                <Footprints class="size-4" aria-hidden="true" />
                <span class="hidden group-hover:inline group-focus-visible:inline">Siguiente capítulo</span>
            </button>
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

        <PuzzleWindow v-if="currentPuzzle" v-bind="currentPuzzle" @close="currentPuzzle = null" @solved="onSolved" />
    </main>
</template>
