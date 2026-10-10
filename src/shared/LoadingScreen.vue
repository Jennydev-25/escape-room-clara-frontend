<script setup>
defineProps({
    title: { type: String, required: true },
    message: { type: String, default: '' },
    progress: { type: Number, default: 0 },
})
</script>

<template>
    <div class="loading-screen fixed inset-0 z-50 flex flex-col items-center justify-center gap-8 bg-surface" role="status" aria-live="polite">
        <h1 class="loading-screen__title font-display text-5xl text-on-surface sm:text-6xl">{{ title }}</h1>
        <div class="loading-screen__track h-3 w-64 overflow-hidden rounded-full bg-surface-container-high sm:w-80" role="progressbar" :aria-valuenow="progress" aria-valuemin="0" aria-valuemax="100">
            <div class="loading-screen__bar h-full rounded-full bg-primary transition-[width] duration-1000 ease-out" :style="{ width: progress + '%' }"></div>
        </div>
        <p v-if="message" class="loading-screen__message font-mono text-base text-on-surface-variant sm:text-lg">{{ message }}</p>
    </div>
</template>
