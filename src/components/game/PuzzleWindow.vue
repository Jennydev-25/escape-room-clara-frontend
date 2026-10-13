<script setup>
import { useId } from 'vue'
import BaseWindow from '@/shared/BaseWindow.vue'

defineProps({
    id: { type: Number, required: true },
    title: { type: String, required: true },
    question: { type: String, required: true },
})

const emit = defineEmits(['close'])

const answerId = useId()
</script>

<template>
    <BaseWindow :title="title" @close="emit('close')">
        <form class="flex flex-col gap-4">
            <p class="text-base leading-relaxed text-on-surface">{{ question }}</p>

            <label :for="answerId" class="text-sm text-on-surface-variant">Tu respuesta</label>
            <input
                :id="answerId"
                type="text"
                autocomplete="off"
                class="w-full rounded-lg border border-outline bg-surface px-3 py-2 text-on-surface focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >

            <button
                type="submit"
                class="self-end rounded-lg bg-primary px-4 py-2 text-sm font-medium text-on-primary transition-colors hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >Comprobar</button>
        </form>
    </BaseWindow>
</template>
