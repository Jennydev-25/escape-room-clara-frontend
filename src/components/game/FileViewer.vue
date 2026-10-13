<script setup>
import { inject, onMounted, ref } from 'vue'
import BaseWindow from '@/shared/BaseWindow.vue'

const props = defineProps({
    path: { type: String, required: true },
})

const emit = defineEmits(['close'])

const staticFileService = inject('StaticFileService')
const name = props.path.split('/').pop()
const extension = name.split('.').pop().toLowerCase()
const isImage = ['png', 'jpg', 'jpeg', 'webp'].includes(extension)
const isPdf = extension === 'pdf'
const url = ref('')
const text = ref('')

onMounted(async () => {
    url.value = await staticFileService.getFileUrl(props.path)
    if (!isImage && !isPdf) {
        const response = await fetch(url.value)
        text.value = await response.text()
    }
})
</script>

<template>
    <BaseWindow :title="name" @close="emit('close')">
        <img v-if="isImage" :src="url" :alt="name" class="mx-auto max-h-[calc(100dvh-8rem)] max-w-full rounded-lg object-contain md:max-h-[calc(85dvh-8rem)]">
        <iframe v-else-if="isPdf" :src="url" :title="name" class="h-[calc(100dvh-8rem)] w-full rounded-lg md:h-[calc(85dvh-8rem)]"></iframe>
        <pre v-else class="font-mono text-sm leading-relaxed whitespace-pre-wrap text-on-surface">{{ text }}</pre>
    </BaseWindow>
</template>
