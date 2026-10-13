<script setup>
import { File, FileImage, FileText } from '@lucide/vue'
import { inject, onMounted, ref } from 'vue'
import FileViewer from '@/components/game/FileViewer.vue'
import BaseWindow from '@/shared/BaseWindow.vue'

const emit = defineEmits(['close'])

const trashService = inject('TrashService')
const files = ref([])
const openPath = ref(null)

const icons = { txt: FileText, png: FileImage, jpg: FileImage }
const iconOf = (name) => icons[name.split('.').pop()] ?? File

onMounted(async () => {
    files.value = await trashService.listDiscardedFiles()
})
</script>

<template>
    <BaseWindow title="Papelera" @close="emit('close')">
        <ul class="flex flex-wrap gap-2">
            <li v-for="file in files" :key="file.getBody()">
                <button
                    type="button"
                    class="flex w-24 flex-col items-center gap-2 rounded-2xl p-3 text-center text-xs text-on-surface transition-colors hover:bg-surface-container-high focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:w-28"
                    @dblclick="openPath = file.getBody()"
                >
                    <component :is="iconOf(file.getName())" class="size-10 text-primary" aria-hidden="true" />
                    <span class="wrap-anywhere">{{ file.getName() }}</span>
                </button>
            </li>
        </ul>
    </BaseWindow>

    <FileViewer v-if="openPath" :path="openPath" @close="openPath = null" />
</template>
