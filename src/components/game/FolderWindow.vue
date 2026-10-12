<script setup>
import { File, FileImage, FileText } from '@lucide/vue'
import { inject, onMounted, ref } from 'vue'
import FileViewer from '@/components/game/FileViewer.vue'
import BaseWindow from '@/shared/BaseWindow.vue'

const props = defineProps({
    code: { type: String, required: true },
})

const emit = defineEmits(['close'])

const folderService = inject('FolderService')
const puzzleService = inject('PuzzleService')
const folder = ref(null)
const files = ref([])
const openPath = ref(null)

const icons = { txt: FileText, png: FileImage, jpg: FileImage }
const iconOf = (name) => icons[name.split('.').pop()] ?? File

// teclado (detail 0) o pantalla táctil abren con un solo gesto; el ratón, con doble clic
const isTouch = () => window.matchMedia?.('(pointer: coarse)').matches
function onClick(event, file) {
    if (event.detail === 0 || isTouch()) openPath.value = file.path
}

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
                    @click="onClick($event, file)"
                    @dblclick="openPath = file.path"
                >
                    <component :is="iconOf(file.name)" class="size-10 text-primary" aria-hidden="true" />
                    <span class="wrap-anywhere">{{ file.name }}</span>
                </button>
            </li>
        </ul>
    </BaseWindow>

    <FileViewer v-if="openPath" :path="openPath" @close="openPath = null" />
</template>
