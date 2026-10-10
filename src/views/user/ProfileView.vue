<script setup>
import { ref } from 'vue'
import DashboardLayout from '@/shared/dashboard/DashboardLayout.vue'
import InvestigatorCredentialCard from '@/shared/dashboard/InvestigatorCredentialCard.vue'
import AccountCredentialsCard from '@/shared/dashboard/AccountCredentialsCard.vue'

const avatarId = ref(null)
</script>

<template>
    <DashboardLayout player-alias="jugador_01">
        <div class="profile-view flex min-h-0 flex-col lg:h-full">
            <h1 class="profile-view__title font-display text-4xl text-on-surface">Mi perfil</h1>
            <p class="profile-view__subtitle font-body text-base text-on-surface-variant">Registro oficial de tu credencial de investigador y los datos de tu cuenta.</p>

            <div class="profile-view__cards mt-6 flex min-h-0 flex-1 flex-col gap-6 lg:flex-row">
                <InvestigatorCredentialCard
                    class="w-full lg:max-w-sm"
                    alias="jugador_01"
                    case-name="El último archivo de Clara"
                    status="Investigación en curso"
                    :avatar-id="avatarId"
                    @update:avatar-id="avatarId = $event"
                />

                <AccountCredentialsCard class="flex-1" alias="jugador_01" />
            </div>
        </div>
    </DashboardLayout>
</template>
