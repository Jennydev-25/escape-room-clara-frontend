<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { LogIn } from '@lucide/vue'
import NavBar from '@/components/home/NavBar.vue'

const emit = defineEmits(['abrir-acceso'])

const scrolled = ref(false)

function handleScroll() {
    scrolled.value = window.scrollY > 10
}

onMounted(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
    <Transition
        enter-active-class="transition duration-500 ease-out motion-reduce:transition-none"
        enter-from-class="opacity-0 -translate-y-2"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition duration-200 ease-out motion-reduce:transition-none"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-2"
    >
        <header
            v-if="scrolled"
            class="header fixed inset-x-0 top-0 z-40 flex items-center justify-between px-6 pt-4"
        >
            <a href="#" class="header__brand shrink-0" aria-label="Ir al inicio">
                <img
                    src="@/assets/images/home/logo.png"
                    alt="El último archivo de Clara"
                    class="header__logo h-10 w-10 object-contain"
                >
            </a>

            <NavBar />

            <button
                type="button"
                class="header__access flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/20 bg-surface/15 text-on-surface shadow-lg backdrop-blur-2xl backdrop-saturate-150 transition-colors hover:text-primary"
                aria-label="Iniciar sesión o registrarme"
                @click="emit('abrir-acceso', 'login')"
            >
                <LogIn class="h-4 w-4" aria-hidden="true" />
            </button>
        </header>
    </Transition>
</template>
