<script setup>
import { onMounted, ref } from 'vue'
import LoadingScreen from '@/shared/LoadingScreen.vue'

const isLoading = ref(true)
const progress = ref(0)

function waitForWindowLoad() {
    if (document.readyState === 'complete') return Promise.resolve()
    return new Promise((resolve) => window.addEventListener('load', resolve, { once: true }))
}

function waitMinimumDuration() {
    return new Promise((resolve) => setTimeout(resolve, 800))
}

function wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms))
}

onMounted(async () => {
    const progressInterval = setInterval(() => {
        if (progress.value < 90) progress.value += 15
    }, 100)

    await Promise.all([waitForWindowLoad(), waitMinimumDuration()])

    clearInterval(progressInterval)
    progress.value = 100
    await wait(300)
    isLoading.value = false
})
</script>

<template>
    <LoadingScreen v-if="isLoading" title="Bienvenid@" message="Cargando investigación..." :progress="progress" />
    <RouterView v-else />
</template>

<style scoped></style>
