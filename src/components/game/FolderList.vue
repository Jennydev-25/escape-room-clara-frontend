<script setup>
import { Folder } from '@lucide/vue'
import { inject, onMounted, ref } from 'vue'

const folderService = inject('FolderService')
const folders = ref([])

onMounted(async () => {
    folders.value = await folderService.listFolders()
})
</script>

<template>
    <ul class="relative grid grid-cols-3 content-start gap-2 p-4 sm:grid-cols-4 sm:p-6 md:grid-cols-6 lg:grid-cols-8">
        <li v-for="folder in folders" :key="folder.getCode()">
            <button
                type="button"
                class="flex w-full flex-col items-center gap-1 rounded-2xl p-3 text-center text-xs font-medium tracking-wide text-on-surface uppercase transition-colors hover:bg-surface-container/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
                <Folder class="size-12 fill-os-folder/25 text-os-folder sm:size-14" aria-hidden="true" />
                <span class="wrap-anywhere">{{ folder.getName() }}</span>
            </button>
        </li>
    </ul>
</template>
