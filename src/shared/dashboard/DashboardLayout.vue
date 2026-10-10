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
    <div class="dashboard-layout flex min-h-screen flex-col bg-surface font-body text-on-surface lg:h-screen lg:min-h-0 lg:overflow-hidden">
        <DashboardHeader :player-alias="playerAlias" />

        <div class="dashboard-layout__status flex min-h-0 items-center justify-between border-b border-outline/30 bg-surface-container px-6 py-2 font-mono text-xs text-on-surface-variant">
            <span class="flex items-center gap-2">
                <span class="h-2 w-2 -translate-y-px animate-pulse rounded-full bg-success" />
                TERMINAL ACTIVA
            </span>
            <span>Sesión abierta // Estado: <span class="uppercase">clasificada</span></span>
        </div>

        <div class="dashboard-layout__workspace flex flex-col lg:min-h-0 lg:flex-1 lg:flex-row">
            <DashboardSidebar @logout="handleLogout" />

            <main class="dashboard-layout__content p-4 lg:min-h-0 lg:flex-1 lg:overflow-hidden lg:p-6">
                <slot />
            </main>
        </div>

        <DashboardFooter />
    </div>
</template>
