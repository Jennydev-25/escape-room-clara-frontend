<script setup>
import { UserRound } from '@lucide/vue'

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
        <header class="dashboard-layout__header flex items-center justify-between border-b border-outline/30 px-6 py-4">
            <div class="flex items-center gap-3">
                <img
                    src="@/assets/images/home/logo.png"
                    alt="El último archivo de Clara"
                    class="h-10 w-10 shrink-0 -translate-y-1 object-contain"
                >
                <div class="flex items-baseline gap-3 whitespace-nowrap">
                    <span class="font-display text-lg uppercase tracking-wide text-primary">El último archivo de Clara</span>
                    <span class="font-display text-lg text-on-surface-variant">·</span>
                    <span class="font-display text-lg uppercase tracking-wide text-on-surface-variant">Terminal de investigación</span>
                </div>
            </div>
            <div class="flex items-center gap-3">
                <span class="dashboard-layout__alias font-label text-sm uppercase tracking-wide text-on-surface">{{ playerAlias }}</span>
                <span class="flex h-9 w-9 items-center justify-center rounded-full bg-surface-container-high text-on-surface-variant">
                    <component :is="UserRound" :size="18" />
                </span>
            </div>
        </header>

        <div class="dashboard-layout__status flex min-h-0 items-center justify-between border-b border-outline/30 bg-surface-container px-6 py-2 font-mono text-xs text-on-surface-variant">
            <span class="flex items-center gap-2">
                <span class="h-2 w-2 -translate-y-px animate-pulse rounded-full bg-primary" />
                TERMINAL ACTIVA
            </span>
            <span>SESIÓN ABIERTA</span>
        </div>

        <div class="dashboard-layout__body flex min-h-0 flex-1">
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
    </div>
</template>
