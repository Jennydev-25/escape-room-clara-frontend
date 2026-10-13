<script setup>
import { onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import LoadingScreen from '@/shared/LoadingScreen.vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const route = useRoute()
const router = useRouter()

const isLoading = ref(true)
const progress = ref(0)
const loadingTitle = ref('Bienvenid@')
const loadingMessage = ref('Cargando investigación...')

watch(() => authStore.isAuthenticated, (isAuthenticated) => {
    if (!isAuthenticated && route.meta.requiresAuth) {
        router.push({ name: 'home' })
    }
})

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

// pantalla de carga: la barra sube sola hasta 90 y se completa cuando acaba la espera
async function runLoading(waitFor) {
    isLoading.value = true
    progress.value = 0

    const progressInterval = setInterval(() => {
        if (progress.value < 90) progress.value += 15
    }, 100)

    await waitFor

    clearInterval(progressInterval)
    progress.value = 100
    await wait(300)
    isLoading.value = false
}

onMounted(() => runLoading(Promise.all([waitForWindowLoad(), waitMinimumDuration()])))

// al cambiar de vista (no en la primera carga) se muestra la carga de esa ruta
watch(() => route.name, (_name, previousName) => {
    const loading = route.meta.loading
    if (!previousName || isLoading.value || !loading) return
    loadingTitle.value = loading.title
    loadingMessage.value = loading.message
    runLoading(waitMinimumDuration())
})
</script>

<template>
    <LoadingScreen v-if="isLoading" :title="loadingTitle" :message="loadingMessage" :progress="progress" />
    <RouterView v-else />
</template>

<style scoped></style>
