<script setup>
import { X } from '@lucide/vue'
import { useId } from 'vue'

defineProps({
    title: { type: String, required: true },
})

const emit = defineEmits(['close'])

const titleId = useId()
</script>

<template>
    <div class="fixed inset-0 z-40 flex justify-center bg-surface/70 backdrop-blur-sm md:items-center md:p-6">
        <section
            role="dialog"
            aria-modal="true"
            :aria-labelledby="titleId"
            @keydown.esc="emit('close')"
            class="flex w-full flex-col overflow-hidden border border-outline bg-surface-container text-on-surface shadow-2xl md:max-h-[85dvh] md:max-w-3xl md:rounded-2xl"
        >
            <header class="flex items-center justify-between gap-3 border-b border-outline px-4 py-3 sm:px-6">
                <h2 :id="titleId" class="min-w-0 truncate font-mono text-sm tracking-wide text-primary uppercase">{{ title }}</h2>
                <button
                    type="button"
                    class="flex size-8 shrink-0 items-center justify-center rounded-full text-on-surface-variant transition-colors hover:bg-white/15 hover:text-on-surface active:bg-white/25 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                    aria-label="Cerrar"
                    @click="emit('close')"
                >
                    <X class="size-5" aria-hidden="true" />
                </button>
            </header>

            <div class="min-h-0 flex-1 overflow-y-auto p-4 sm:p-6">
                <slot />
            </div>
        </section>
    </div>
</template>
