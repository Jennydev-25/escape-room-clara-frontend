<script setup>
import { Folder } from '@lucide/vue'
import { inject, onMounted, ref } from 'vue'
import { useSeenStore } from '@/stores/seen'

const folderService = inject('FolderService')
const seenStore = useSeenStore()
const folders = ref([])

onMounted(async () => {
    folders.value = await folderService.listFolders()
})

// una carpeta es nueva hasta que se abre por primera vez
const isNew = (folder) => !seenStore.isSeen(`folder:${folder.getCode()}`)
const open = (folder) => seenStore.markSeen(`folder:${folder.getCode()}`)
</script>

<template>
    <ul class="relative grid grid-cols-3 content-start gap-2 p-4 sm:grid-cols-4 sm:p-6 md:grid-cols-6 lg:grid-cols-8">
        <li v-for="folder in folders" :key="folder.getCode()">
            <button
                type="button"
                class="flex w-full flex-col items-center gap-1 rounded-2xl p-3 text-center text-xs font-medium tracking-wide text-on-surface uppercase transition-colors hover:bg-surface-container/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                @click="open(folder)"
            >
                <span class="relative">
                    <Folder class="size-12 fill-os-folder/25 text-os-folder sm:size-14" aria-hidden="true" />
                    <span v-if="isNew(folder)" class="absolute top-4 right-2 flex size-3" aria-hidden="true">
                        <span class="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-75 motion-reduce:animate-none"></span>
                        <span class="relative inline-flex size-3 rounded-full bg-primary"></span>
                    </span>
                </span>
                <span class="wrap-anywhere">{{ folder.getName() }}</span>
                <span v-if="isNew(folder)" class="sr-only">, con contenido nuevo</span>
            </button>
        </li>
    </ul>
</template>
