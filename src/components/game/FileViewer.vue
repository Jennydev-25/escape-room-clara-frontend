<script setup>
import { inject, onMounted, ref } from 'vue'
import BaseWindow from '@/shared/BaseWindow.vue'

const props = defineProps({
    path: { type: String, required: true },
})

const emit = defineEmits(['close'])

const staticFileService = inject('StaticFileService')
const name = props.path.split('/').pop()
const text = ref('')

onMounted(async () => {
    const url = await staticFileService.getFileUrl(props.path)
    const response = await fetch(url)
    text.value = await response.text()
})
</script>

<template>
    <BaseWindow :title="name" @close="emit('close')">
        <pre class="font-mono text-sm leading-relaxed whitespace-pre-wrap text-on-surface">{{ text }}</pre>
    </BaseWindow>
</template>
