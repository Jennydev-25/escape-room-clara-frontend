<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import DashboardHeader from '@/shared/dashboard/DashboardHeader.vue'
import DashboardSidebar from '@/shared/dashboard/DashboardSidebar.vue'
import DashboardFooter from '@/shared/dashboard/DashboardFooter.vue'

defineProps({
    playerAlias: {
        type: String,
        required: true,
    },
})

const router = useRouter()
const authStore = useAuthStore()

const handleLogout = () => {
    authStore.logout()
    router.push('/')
}
</script>

<template>
    <div class="dashboard-layout flex h-screen min-h-0 flex-col overflow-hidden bg-surface font-body text-on-surface">
        <DashboardHeader :player-alias="playerAlias" />

        <div class="dashboard-layout__status flex min-h-0 items-center justify-between border-b border-outline/30 bg-surface-container px-6 py-2 font-mono text-xs text-on-surface-variant">
            <span class="flex items-center gap-2">
                <span class="h-2 w-2 -translate-y-px animate-pulse rounded-full bg-success" />
                TERMINAL ACTIVA
            </span>
            <span>Sesión abierta // Estado: <span class="uppercase">clasificada</span></span>
        </div>

        <div class="dashboard-layout__workspace flex min-h-0 flex-1">
            <DashboardSidebar @logout="handleLogout" />

            <main class="dashboard-layout__content min-h-0 flex-1 overflow-hidden p-6">
                <slot />
            </main>
        </div>

        <DashboardFooter />
    </div>
</template>
