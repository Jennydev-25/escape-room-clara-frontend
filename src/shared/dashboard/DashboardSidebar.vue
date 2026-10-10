<script setup>
import { DoorOpen } from '@lucide/vue'

const props = defineProps({
    activeSection: {
        type: String,
        required: true,
    },
})

defineEmits(['logout'])

const currentPageOrUndefined = (section) => (props.activeSection === section ? 'page' : undefined)
</script>

<template>
    <nav class="dashboard-sidebar flex min-h-0 w-56 flex-col gap-2 border-r border-outline/30 bg-surface-container p-4">
        <a
            href="#"
            :aria-current="currentPageOrUndefined('inicio')"
            class="rounded-xl px-4 py-2 font-label text-sm uppercase tracking-wide text-on-surface transition-colors aria-[current=page]:bg-primary aria-[current=page]:text-on-primary"
        >Resumen</a>
        <a
            href="#"
            :aria-current="currentPageOrUndefined('perfil')"
            class="rounded-xl px-4 py-2 font-label text-sm uppercase tracking-wide text-on-surface transition-colors aria-[current=page]:bg-primary aria-[current=page]:text-on-primary"
        >Mi perfil</a>

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
