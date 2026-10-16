<script setup>
import { inject, onMounted, ref } from 'vue'
import DashboardLayout from '@/shared/dashboard/DashboardLayout.vue'
import InvestigatorCredentialCard from '@/shared/dashboard/InvestigatorCredentialCard.vue'
import AccountCredentialsCard from '@/shared/dashboard/AccountCredentialsCard.vue'

const userService = inject('UserService')

// alias del jugador, el que guardó al registrarse
const alias = ref('')
const fullName = ref('')
const email = ref('')
const avatarId = ref(null)

// lo que el jugador escribe en el formulario de la cuenta
const formFullName = ref('')
const formAlias = ref('')

onMounted(async () => {
    const profile = await userService.getProfile()
    alias.value = profile.getAlias()
    fullName.value = profile.getFullName()
    email.value = profile.getEmail()
    avatarId.value = profile.getAvatarId()
})

// el back guarda el avatar junto con los datos actuales del jugador; si falla, se queda el anterior
async function saveAvatar(newAvatarId) {
    try {
        await userService.updateProfile({
            alias: alias.value,
            email: email.value,
            emailConfirmation: email.value,
            avatarId: newAvatarId,
        })
        avatarId.value = newAvatarId
    } catch (error) {
        // se mantiene el avatar que ya estaba guardado
    }
}

// un campo vacío conserva el valor que ya tenía el jugador
async function saveProfile() {
    const profile = await userService.completeProfile({
        fullName: formFullName.value || fullName.value,
        alias: formAlias.value || alias.value,
    })
    fullName.value = profile.getFullName()
    alias.value = profile.getAlias()
}
</script>

<template>
    <DashboardLayout :player-alias="alias" :avatar-id="avatarId">
        <div class="profile-view flex min-h-0 flex-col lg:h-full">
            <h1 class="profile-view__title font-display text-4xl text-on-surface">Mi perfil</h1>
            <p class="profile-view__subtitle font-body text-base text-on-surface-variant">Registro oficial de tu credencial de investigador y los datos de tu cuenta.</p>

            <div class="profile-view__cards mt-6 flex min-h-0 flex-1 flex-col gap-6 lg:flex-row">
                <InvestigatorCredentialCard
                    class="w-full lg:max-w-sm"
                    :full-name="fullName"
                    :alias="alias"
                    case-name="El último archivo de Clara"
                    status="Investigación en curso"
                    :avatar-id="avatarId"
                    @update:avatar-id="saveAvatar"
                />

                <AccountCredentialsCard
                    class="flex-1"
                    v-model:fullName="formFullName"
                    v-model:alias="formAlias"
                    @submit="saveProfile"
                />
            </div>
        </div>
    </DashboardLayout>
</template>
