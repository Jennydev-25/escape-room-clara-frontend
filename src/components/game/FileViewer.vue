<script setup>
import { inject, onMounted, ref } from 'vue'
import BaseWindow from '@/shared/BaseWindow.vue'

const props = defineProps({
    path: { type: String, required: true },
})

const emit = defineEmits(['close'])

const staticFileService = inject('StaticFileService')
const name = props.path.split('/').pop()
const isImage = ['png', 'jpg', 'jpeg', 'webp'].includes(name.split('.').pop().toLowerCase())
const url = ref('')
const text = ref('')

onMounted(async () => {
    url.value = await staticFileService.getFileUrl(props.path)
    if (!isImage) {
        const response = await fetch(url.value)
        text.value = await response.text()
    }
})
</script>

<template>
    <BaseWindow :title="name" @close="emit('close')">
        <img v-if="isImage" :src="url" :alt="name" class="mx-auto max-h-full max-w-full rounded-lg object-contain">
        <pre v-else class="font-mono text-sm leading-relaxed whitespace-pre-wrap text-on-surface">{{ text }}</pre>
    </BaseWindow>
</template>
