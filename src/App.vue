<script setup>
import { onMounted, ref } from 'vue'
import LoadingScreen from '@/shared/LoadingScreen.vue'

const isLoading = ref(true)

onMounted(() => {
    setTimeout(() => {
        isLoading.value = false
    }, 1200)
})
</script>

<template>
    <LoadingScreen v-if="isLoading" title="Bienvenid@" message="Cargando investigación..." />
    <RouterView v-else />
</template>

<style scoped></style>
