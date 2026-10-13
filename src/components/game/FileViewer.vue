<script setup>
import { ZoomIn, ZoomOut } from '@lucide/vue'
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
const zoom = ref(1)

// cada clic en acercar amplía un paso fijo
function zoomIn() {
    zoom.value += 0.25
}

// cada clic en alejar reduce un paso fijo
function zoomOut() {
    zoom.value -= 0.25
}

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
        <div v-if="isImage" class="relative mx-auto w-fit max-w-full">
            <div class="max-h-[calc(100dvh-8rem)] overflow-auto rounded-lg md:max-h-[calc(85dvh-8rem)]">
                <img :src="url" :alt="name" :style="{ zoom }" class="max-h-[calc(100dvh-8rem)] max-w-full object-contain md:max-h-[calc(85dvh-8rem)]">
            </div>
            <div class="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-full border border-outline bg-surface-container/90 p-1 backdrop-blur-sm">
                <button type="button" class="flex size-8 shrink-0 items-center justify-center rounded-full text-on-surface-variant transition-colors hover:bg-white/15 hover:text-on-surface active:bg-white/25 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary" aria-label="Alejar" @click="zoomOut">
                    <ZoomOut class="size-5" aria-hidden="true" />
                </button>
                <button type="button" class="flex size-8 shrink-0 items-center justify-center rounded-full text-on-surface-variant transition-colors hover:bg-white/15 hover:text-on-surface active:bg-white/25 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary" aria-label="Acercar" @click="zoomIn">
                    <ZoomIn class="size-5" aria-hidden="true" />
                </button>
            </div>
        </div>
        <iframe v-else-if="isPdf" :src="url" :title="name" class="h-[calc(100dvh-8rem)] w-full rounded-lg md:h-[calc(85dvh-8rem)]"></iframe>
        <pre v-else class="font-mono text-sm leading-relaxed whitespace-pre-wrap text-on-surface">{{ text }}</pre>
    </BaseWindow>
</template>
