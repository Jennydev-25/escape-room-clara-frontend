<script setup>
import { computed } from 'vue'
import { UserRound } from '@lucide/vue'

// las imágenes de los avatares, por la ruta de su archivo (avatar-1.png ... avatar-9.png)
const avatarImages = import.meta.glob('@/assets/images/avatars/*.png', { eager: true, import: 'default' })
const AVATAR_FOLDER = '/src/assets/images/avatars/'

const props = defineProps({
    playerAlias: {
        type: String,
        required: true,
    },
    avatarId: {
        type: Number,
        default: null,
    },
    subtitle: {
        type: String,
        default: 'Terminal de investigación',
    },
})

const avatarSrc = computed(() => avatarImages[`${AVATAR_FOLDER}avatar-${props.avatarId}.png`])
</script>

<template>
    <header class="dashboard-header flex items-center justify-between gap-2 border-b border-outline/30 px-4 py-2.5 lg:px-6">
        <div class="flex min-w-0 items-center gap-2 lg:gap-3">
            <RouterLink to="/" aria-label="Ir al inicio" class="shrink-0">
                <img
                    src="@/assets/images/home/logo.png"
                    alt="El último archivo de Clara"
                    class="h-8 w-8 -translate-y-1 object-contain lg:h-10 lg:w-10"
                >
            </RouterLink>
            <div class="flex min-w-0 items-baseline gap-2 lg:gap-3">
                <span class="truncate font-display text-base uppercase tracking-wide text-primary lg:text-lg">El último archivo de Clara</span>
                <span class="hidden font-display text-lg text-on-surface-variant lg:inline">·</span>
                <span class="hidden font-display text-lg uppercase tracking-wide text-on-surface-variant lg:inline">{{ subtitle }}</span>
            </div>
        </div>
        <div class="flex shrink-0 items-center gap-3">
            <span class="dashboard-header__alias hidden font-label text-sm uppercase tracking-wide text-on-surface sm:inline">{{ playerAlias }}</span>
            <span class="dashboard-header__avatar flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-surface-container-high text-on-surface-variant">
                <img
                    v-if="avatarSrc"
                    :src="avatarSrc"
                    :alt="`Avatar ${avatarId}`"
                    class="h-full w-full scale-130 object-cover"
                >
                <component :is="UserRound" v-else class="h-1/2 w-1/2" />
            </span>
        </div>
    </header>
</template>
