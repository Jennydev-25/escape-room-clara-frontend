<script setup>
import DashboardLayout from '@/shared/dashboard/DashboardLayout.vue'
import InvestigatorCredentialCard from '@/shared/dashboard/InvestigatorCredentialCard.vue'
import AccountCredentialsCard from '@/shared/dashboard/AccountCredentialsCard.vue'
</script>

<template>
    <DashboardLayout player-alias="jugador_01">
        <div class="profile-view flex h-full min-h-0 flex-col">
            <h1 class="profile-view__title font-display text-4xl text-on-surface">Mi perfil</h1>
            <p class="profile-view__subtitle font-body text-base text-on-surface-variant">Registro oficial de tu credencial de investigador y los datos de tu cuenta.</p>

            <div class="profile-view__cards mt-6 flex min-h-0 flex-1 gap-6">
                <InvestigatorCredentialCard
                    class="w-full max-w-sm"
                    alias="jugador_01"
                    case-name="El último archivo de Clara"
                    status="Investigación en curso"
                />

                <AccountCredentialsCard class="flex-1" alias="jugador_01" />
            </div>
        </div>
    </DashboardLayout>
</template>
