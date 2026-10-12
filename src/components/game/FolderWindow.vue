<script setup>
import { FileText } from '@lucide/vue'
import { inject, onMounted, ref } from 'vue'
import BaseWindow from '@/shared/BaseWindow.vue'

const props = defineProps({
    code: { type: String, required: true },
})

const emit = defineEmits(['close'])

const folderService = inject('FolderService')
const folder = ref(null)

onMounted(async () => {
    folder.value = await folderService.getFolder(props.code)
})
</script>

<template>
    <BaseWindow :title="folder?.getName() ?? ''" @close="emit('close')">
        <ul class="flex flex-wrap gap-2">
            <li v-for="puzzle in folder?.getPuzzles() ?? []" :key="puzzle.getId()">
                <button
                    type="button"
                    class="flex w-24 flex-col items-center gap-2 rounded-2xl p-3 text-center text-xs text-on-surface transition-colors hover:bg-surface-container-high focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:w-28"
                >
                    <FileText class="size-10 text-primary" aria-hidden="true" />
                    <span class="wrap-anywhere">{{ puzzle.getTitle() }}</span>
                </button>
            </li>
        </ul>
    </BaseWindow>
</template>
