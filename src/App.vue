<script setup>
import { onMounted, ref } from 'vue'
import LoadingScreen from '@/shared/LoadingScreen.vue'

const isLoading = ref(true)

function waitForWindowLoad() {
    if (document.readyState === 'complete') return Promise.resolve()
    return new Promise((resolve) => window.addEventListener('load', resolve, { once: true }))
}

function waitMinimumDuration() {
    return new Promise((resolve) => setTimeout(resolve, 1200))
}

onMounted(async () => {
    await Promise.all([waitForWindowLoad(), waitMinimumDuration()])
    isLoading.value = false
})
</script>

<template>
    <LoadingScreen v-if="isLoading" title="Bienvenid@" message="Cargando investigación..." />
    <RouterView v-else />
</template>

<style scoped></style>
