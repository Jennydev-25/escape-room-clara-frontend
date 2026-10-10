<script setup>
import { ref } from 'vue'
import { Menu, X } from '@lucide/vue'
import { useScrollSpy } from '@/composables/useScrollSpy'

const links = [
    { href: '#', label: 'Inicio' },
    { href: '#el-caso', label: 'El caso' },
    { href: '#sobre-el-juego', label: 'Sobre el juego' },
    { href: '#contacto', label: 'Contacto' },
]

const { activeId } = useScrollSpy(['el-caso', 'sobre-el-juego', 'contacto'])

function isActive(href) {
    return href === '#' ? activeId.value === null : href === `#${activeId.value}`
}

const mobileOpen = ref(false)

function closeMobile() {
    mobileOpen.value = false
}
</script>

<template>
    <nav class="navbar relative" aria-label="Secciones de la página">
        <div
            class="navbar__links hidden items-center gap-6 rounded-full border border-white/20 bg-surface/15 px-6 py-2 shadow-2xl backdrop-blur-2xl backdrop-saturate-150 sm:inline-flex"
        >
            <a
                v-for="link in links"
                :key="link.href"
                :href="link.href"
                class="navbar__link font-label text-xs uppercase tracking-widest transition-colors"
                :class="isActive(link.href) ? 'text-primary' : 'text-on-surface-variant hover:text-primary'"
            >
                {{ link.label }}
            </a>
        </div>

        <button
            type="button"
            class="navbar__toggle flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-surface/15 text-on-surface shadow-lg backdrop-blur-2xl backdrop-saturate-150 transition-colors hover:text-primary sm:hidden"
            :aria-expanded="mobileOpen"
            aria-controls="navbar-mobile-menu"
            :aria-label="mobileOpen ? 'Cerrar menú' : 'Abrir menú'"
            @click="mobileOpen = !mobileOpen"
        >
            <component :is="mobileOpen ? X : Menu" class="h-5 w-5" aria-hidden="true" />
        </button>

        <Transition
            enter-active-class="transition duration-200 ease-out motion-reduce:transition-none"
            enter-from-class="opacity-0 -translate-y-2"
            enter-to-class="opacity-100 translate-y-0"
            leave-active-class="transition duration-150 ease-out motion-reduce:transition-none"
            leave-from-class="opacity-100 translate-y-0"
            leave-to-class="opacity-0 -translate-y-2"
        >
            <div
                v-if="mobileOpen"
                id="navbar-mobile-menu"
                class="navbar__mobile-menu absolute left-1/2 top-full z-50 mt-3 flex w-48 -translate-x-1/2 flex-col gap-1 rounded-2xl border border-white/20 bg-surface/15 p-3 text-center shadow-2xl backdrop-blur-2xl backdrop-saturate-150 sm:hidden"
            >
                <a
                    v-for="link in links"
                    :key="link.href"
                    :href="link.href"
                    class="navbar__mobile-link font-label rounded-lg px-3 py-2 text-xs uppercase tracking-widest transition-colors"
                    :class="isActive(link.href) ? 'bg-white/10 text-primary' : 'text-on-surface-variant hover:bg-white/10 hover:text-primary'"
                    @click="closeMobile"
                >
                    {{ link.label }}
                </a>
            </div>
        </Transition>
    </nav>
</template>
