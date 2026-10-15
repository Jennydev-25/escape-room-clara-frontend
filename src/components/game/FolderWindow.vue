<script setup>
import { File, FileImage, FileText } from '@lucide/vue'
import { inject, onMounted, ref } from 'vue'
import FileViewer from '@/components/game/FileViewer.vue'
import { shouldOpenOnClick } from '@/composables/game/shouldOpenOnClick'
import BaseWindow from '@/shared/BaseWindow.vue'
import { useSeenStore } from '@/stores/seen'

const props = defineProps({
    code: { type: String, required: true },
})

const emit = defineEmits(['close'])

const folderService = inject('FolderService')
const puzzleService = inject('PuzzleService')
const seenStore = useSeenStore()
const folder = ref(null)
const files = ref([])
const openPath = ref(null)

const icons = { txt: FileText, png: FileImage, jpg: FileImage }
const iconOf = (name) => icons[name.split('.').pop()] ?? File

// el punto espera a que lleguen las claves vistas del backend
const isNewFile = (file) => seenStore.isLoaded && !seenStore.isSeen(`file:${file.path}`)

onMounted(async () => {
    folder.value = await folderService.getFolder(props.code)
    const puzzles = await Promise.all(folder.value.getPuzzles().map((puzzle) => puzzleService.getPuzzle(puzzle.getId())))
    files.value = puzzles.flatMap((puzzle) => puzzle.getFiles().map((path) => ({ path, name: path.split('/').pop() })))
})
</script>

<template>
    <BaseWindow :title="folder?.getName() ?? ''" @close="emit('close')">
        <ul class="flex flex-wrap gap-2">
            <li v-for="file in files" :key="file.path">
                <button
                    type="button"
                    class="flex w-24 flex-col items-center gap-2 rounded-2xl p-3 text-center text-xs text-on-surface transition-colors hover:bg-surface-container-high focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:w-28"
                    @click="shouldOpenOnClick($event) && (openPath = file.path)"
                    @dblclick="openPath = file.path"
                >
                    <span class="relative">
                        <component :is="iconOf(file.name)" class="size-10 text-primary" aria-hidden="true" />
                        <span v-if="isNewFile(file)" class="absolute top-0 right-0 flex size-3" aria-hidden="true">
                            <span class="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-75 motion-reduce:animate-none"></span>
                            <span class="relative inline-flex size-3 rounded-full bg-primary"></span>
                        </span>
                    </span>
                    <span class="wrap-anywhere">{{ file.name }}</span>
                    <span v-if="isNewFile(file)" class="sr-only">, archivo nuevo</span>
                </button>
            </li>
        </ul>
    </BaseWindow>

    <FileViewer v-if="openPath" :path="openPath" @close="openPath = null" />
</template>
