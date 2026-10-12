<script setup>
import { Folder } from '@lucide/vue'
import { inject, onMounted, ref } from 'vue'
import { useSeenStore } from '@/stores/seen'

const folderService = inject('FolderService')
const seenStore = useSeenStore()
const folders = ref([])
const puzzlesByFolder = ref({})
const errorMessage = ref('')

onMounted(async () => {
    try {
        folders.value = await folderService.listFolders()
        const details = await Promise.all(folders.value.map((folder) => folderService.getFolder(folder.getCode())))
        folders.value.forEach((folder, index) => {
            puzzlesByFolder.value[folder.getCode()] = details[index].getPuzzles()
        })
    } catch (error) {
        folders.value = []
        errorMessage.value = error.message
    }
})

const puzzlesOf = (folder) => puzzlesByFolder.value[folder.getCode()] ?? []

// verde: carpeta que nunca se ha abierto
const isNew = (folder) => !seenStore.isSeen(`folder:${folder.getCode()}`)

// amarillo: carpeta ya abierta a la que le han llegado archivos nuevos
const hasNewFiles = (folder) => !isNew(folder) && puzzlesOf(folder).some((puzzle) => !seenStore.isSeen(`known:${puzzle.getId()}`))

function open(folder) {
    seenStore.markSeen(`folder:${folder.getCode()}`)
    puzzlesOf(folder).forEach((puzzle) => seenStore.markSeen(`known:${puzzle.getId()}`))
}
</script>

<template>
    <div>
        <p v-if="errorMessage" role="alert" class="relative m-4 w-fit max-w-md rounded-2xl border border-error bg-error/25 px-4 py-3 text-sm text-os-on-rust sm:m-6">
            {{ errorMessage }}
        </p>
        <ul class="relative grid grid-cols-[repeat(auto-fill,4rem)] content-start justify-start gap-1 p-2 sm:grid-cols-[repeat(auto-fill,5rem)] sm:p-3">
            <li v-for="folder in folders" :key="folder.getCode()">
                <button
                    type="button"
                    class="flex w-16 flex-col items-center gap-1 rounded-2xl p-2 text-center text-xs font-medium tracking-wide text-on-surface uppercase transition-colors hover:bg-surface-container/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:w-20"
                    @click="open(folder)"
                >
                    <span class="relative">
                        <Folder class="size-9 fill-os-folder/25 text-os-folder sm:size-10" aria-hidden="true" />
                        <span v-if="isNew(folder) || hasNewFiles(folder)" class="absolute top-3 right-0 flex size-3" aria-hidden="true">
                            <span class="absolute inline-flex size-full animate-ping rounded-full opacity-75 motion-reduce:animate-none" :class="isNew(folder) ? 'bg-primary' : 'bg-os-clue'"></span>
                            <span class="relative inline-flex size-3 rounded-full" :class="isNew(folder) ? 'bg-primary' : 'bg-os-clue'"></span>
                        </span>
                    </span>
                    <span class="wrap-anywhere">{{ folder.getName() }}</span>
                    <span v-if="isNew(folder)" class="sr-only">, con contenido nuevo</span>
                    <span v-else-if="hasNewFiles(folder)" class="sr-only">, con archivos nuevos</span>
                </button>
            </li>
        </ul>
    </div>
</template>
