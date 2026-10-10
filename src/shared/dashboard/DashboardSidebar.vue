<script setup>
import { DoorOpen } from '@lucide/vue'

defineEmits(['logout'])
</script>

<template>
    <nav class="dashboard-sidebar flex min-h-0 w-56 flex-col gap-2 border-r border-outline/30 bg-surface-container p-4">
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
    </nav>
</template>
