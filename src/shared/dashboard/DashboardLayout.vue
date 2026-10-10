<script setup>
import DashboardHeader from '@/shared/dashboard/DashboardHeader.vue'
import DashboardFooter from '@/shared/dashboard/DashboardFooter.vue'

const props = defineProps({
    activeSection: {
        type: String,
        required: true,
    },
    playerAlias: {
        type: String,
        required: true,
    },
})

const currentPageOrUndefined = (section) => (props.activeSection === section ? 'page' : undefined)
</script>

<template>
    <div class="dashboard-layout flex h-screen min-h-0 flex-col overflow-hidden bg-surface font-body text-on-surface">
        <DashboardHeader :player-alias="playerAlias" />

        <div class="dashboard-layout__status flex min-h-0 items-center justify-between border-b border-outline/30 bg-surface-container px-6 py-2 font-mono text-xs text-on-surface-variant">
            <span class="flex items-center gap-2">
                <span class="h-2 w-2 -translate-y-px animate-pulse rounded-full bg-primary" />
                TERMINAL ACTIVA
            </span>
            <span>SESIÓN ABIERTA</span>
        </div>

        <div class="dashboard-layout__workspace flex min-h-0 flex-1">
            <nav class="dashboard-layout__nav flex min-h-0 w-56 flex-col gap-2 border-r border-outline/30 bg-surface-container p-4">
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
                <div class="mt-auto font-mono text-xs text-primary">● Estado: clasificado</div>
            </nav>

            <main class="dashboard-layout__content min-h-0 flex-1 overflow-hidden p-6">
                <slot />
            </main>
        </div>

        <DashboardFooter />
    </div>
</template>
