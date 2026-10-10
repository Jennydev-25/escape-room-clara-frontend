<script setup>
import DashboardLayout from '@/shared/dashboard/DashboardLayout.vue'
import InvestigatorCredentialCard from '@/shared/dashboard/InvestigatorCredentialCard.vue'
import AccountCredentialsCard from '@/shared/dashboard/AccountCredentialsCard.vue'
</script>

<template>
    <DashboardLayout active-section="perfil" player-alias="jugador_01">
        <h1 class="profile-view__title font-display text-4xl text-on-surface">Mi perfil</h1>
        <p class="profile-view__subtitle font-body text-base text-on-surface-variant">Registro oficial de tu credencial de investigador y los datos de tu cuenta.</p>

        <InvestigatorCredentialCard
            alias="jugador_01"
            case-name="El último archivo de Clara"
            status="Investigación en curso"
        />

        <AccountCredentialsCard alias="jugador_01" />
    </DashboardLayout>
</template>
