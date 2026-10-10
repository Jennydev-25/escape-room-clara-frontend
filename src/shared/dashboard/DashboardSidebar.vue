<script setup>
import { ref } from 'vue'
import { DoorOpen, Menu, X } from '@lucide/vue'

defineEmits(['logout'])

const mobileOpen = ref(false)

function closeMobile() {
    mobileOpen.value = false
}
</script>

<template>
    <nav class="dashboard-sidebar relative flex min-h-0 w-full items-center justify-between border-b border-outline/30 bg-surface-container p-4 sm:w-56 sm:flex-col sm:items-stretch sm:justify-start sm:gap-2 sm:border-b-0 sm:border-r">
        <span class="font-label text-xs uppercase tracking-widest text-on-surface-variant sm:hidden">Menú</span>

        <button
            type="button"
            class="dashboard-sidebar__toggle flex h-9 w-9 items-center justify-center rounded-full text-on-surface-variant transition-colors hover:text-primary sm:hidden"
            :aria-expanded="mobileOpen"
            aria-controls="dashboard-sidebar-menu"
            :aria-label="mobileOpen ? 'Cerrar menú' : 'Abrir menú'"
            @click="mobileOpen = !mobileOpen"
        >
            <component :is="mobileOpen ? X : Menu" :size="20" aria-hidden="true" />
        </button>

        <div class="hidden sm:flex sm:w-full sm:flex-col sm:gap-2">
            <RouterLink
                to="/resumen"
                class="rounded-xl px-4 py-2 font-label text-sm uppercase tracking-wide text-on-surface transition-colors aria-[current=page]:bg-primary aria-[current=page]:text-on-primary"
            >Resumen</RouterLink>
            <RouterLink
                to="/perfil"
                class="rounded-xl px-4 py-2 font-label text-sm uppercase tracking-wide text-on-surface transition-colors aria-[current=page]:bg-primary aria-[current=page]:text-on-primary"
            >Mi perfil</RouterLink>

            <button
                type="button"
                class="mt-auto flex items-center gap-2 rounded-xl px-4 py-2 font-label text-sm uppercase tracking-wide text-error transition-colors hover:bg-error/10"
                @click="$emit('logout')"
            >
                <component :is="DoorOpen" :size="16" />
                Cerrar sesión
            </button>
        </div>

        <div
            v-if="mobileOpen"
            id="dashboard-sidebar-menu"
            class="dashboard-sidebar__mobile-menu absolute left-0 right-0 top-full z-20 flex flex-col gap-1 border-b border-outline/30 bg-surface-container p-4 sm:hidden"
        >
            <RouterLink
                to="/resumen"
                class="rounded-xl px-4 py-2 font-label text-sm uppercase tracking-wide text-on-surface transition-colors aria-[current=page]:bg-primary aria-[current=page]:text-on-primary"
                @click="closeMobile"
            >Resumen</RouterLink>
            <RouterLink
                to="/perfil"
                class="rounded-xl px-4 py-2 font-label text-sm uppercase tracking-wide text-on-surface transition-colors aria-[current=page]:bg-primary aria-[current=page]:text-on-primary"
                @click="closeMobile"
            >Mi perfil</RouterLink>

            <button
                type="button"
                class="flex items-center gap-2 rounded-xl px-4 py-2 font-label text-sm uppercase tracking-wide text-error transition-colors hover:bg-error/10"
                @click="$emit('logout'); closeMobile()"
            >
                <component :is="DoorOpen" :size="16" />
                Cerrar sesión
            </button>
        </div>
    </nav>
</template>
