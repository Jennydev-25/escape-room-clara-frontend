<script setup>
defineProps({
    title: { type: String, required: true },
    message: { type: String, default: '' },
})
</script>

<template>
    <div class="loading-screen fixed inset-0 z-50 flex flex-col items-center justify-center gap-8 bg-surface" role="status" aria-live="polite">
        <div class="loading-screen__spinner h-24 w-24 animate-spin rounded-full border-8 border-outline border-t-primary" aria-hidden="true"></div>
        <h1 class="loading-screen__title font-display text-5xl text-on-surface sm:text-6xl">{{ title }}</h1>
        <p v-if="message" class="loading-screen__message font-mono text-base text-on-surface-variant sm:text-lg">{{ message }}</p>
    </div>
</template>
