<script setup>
import { UserRound } from '@lucide/vue'

defineProps({
    playerAlias: {
        type: String,
        required: true,
    },
    subtitle: {
        type: String,
        default: 'Terminal de investigación',
    },
})
</script>

<template>
    <header class="dashboard-header flex items-center justify-between border-b border-outline/30 px-6 py-4">
        <div class="flex items-center gap-3">
            <RouterLink to="/" aria-label="Ir al inicio" class="shrink-0">
                <img
                    src="@/assets/images/home/logo.png"
                    alt="El último archivo de Clara"
                    class="h-10 w-10 -translate-y-1 object-contain"
                >
            </RouterLink>
            <div class="flex items-baseline gap-3 whitespace-nowrap">
                <span class="font-display text-lg uppercase tracking-wide text-primary">El último archivo de Clara</span>
                <span class="font-display text-lg text-on-surface-variant">·</span>
                <span class="font-display text-lg uppercase tracking-wide text-on-surface-variant">{{ subtitle }}</span>
            </div>
        </div>
        <div class="flex items-center gap-3">
            <span class="dashboard-header__alias font-label text-sm uppercase tracking-wide text-on-surface">{{ playerAlias }}</span>
            <span class="flex h-9 w-9 items-center justify-center rounded-full bg-surface-container-high text-on-surface-variant">
                <component :is="UserRound" :size="18" />
            </span>
        </div>
    </header>
</template>
