<script setup>
defineProps({
    title: { type: String, required: true },
    message: { type: String, default: '' },
})
</script>

<template>
    <div class="loading-screen fixed inset-0 z-50 flex flex-col items-center justify-center gap-6 bg-surface" role="status" aria-live="polite">
        <div class="loading-screen__spinner h-12 w-12 animate-spin rounded-full border-4 border-outline border-t-primary" aria-hidden="true"></div>
        <h1 class="loading-screen__title font-display text-3xl text-on-surface">{{ title }}</h1>
        <p v-if="message" class="loading-screen__message font-mono text-sm text-on-surface-variant">{{ message }}</p>
    </div>
</template>
