<script setup>
import PasswordField from '@/shared/PasswordField.vue'
import BaseButton from '@/shared/BaseButton.vue'

defineProps({
    fullName: {
        type: String,
        default: '',
    },
    alias: {
        type: String,
        default: '',
    },
    email: {
        type: String,
        default: '',
    },
})
</script>

<template>
    <section class="account-credentials-card">
        <h2 class="font-display text-2xl text-on-surface">Datos de acceso y credenciales</h2>
        <p class="font-body text-sm text-on-surface-variant">Cambia tus datos de cuenta o tu contraseña cuando lo necesites.</p>

        <div class="account-credentials-card__fields mt-6 grid grid-cols-3 gap-4">
            <div class="flex flex-col gap-1">
                <label for="credentials-full-name" class="font-label text-xs uppercase tracking-wide text-on-surface-variant">Nombre completo</label>
                <input
                    id="credentials-full-name"
                    type="text"
                    :value="fullName"
                    class="w-full rounded-md border border-outline bg-surface-container px-3 py-2 text-on-surface focus:border-primary focus:outline-none"
                >
            </div>

            <div class="flex flex-col gap-1">
                <label for="credentials-alias" class="font-label text-xs uppercase tracking-wide text-on-surface-variant">Alias</label>
                <input
                    id="credentials-alias"
                    type="text"
                    :value="alias"
                    class="w-full rounded-md border border-outline bg-surface-container px-3 py-2 text-on-surface focus:border-primary focus:outline-none"
                >
            </div>

            <div class="flex flex-col gap-1">
                <label for="credentials-email" class="font-label text-xs uppercase tracking-wide text-on-surface-variant">Correo electrónico</label>
                <input
                    id="credentials-email"
                    type="email"
                    :value="email"
                    class="w-full rounded-md border border-outline bg-surface-container px-3 py-2 text-on-surface focus:border-primary focus:outline-none"
                >
            </div>
        </div>

        <BaseButton type="button" class="account-credentials-card__save mt-4">Guardar cambios</BaseButton>

        <hr class="my-6 border-outline/30">

        <h3 class="font-display text-xl text-on-surface">Cambiar contraseña</h3>

        <div class="account-credentials-card__password mt-4 flex flex-col gap-4">
            <div class="flex flex-col gap-1">
                <label for="credentials-current-password" class="font-label text-xs uppercase tracking-wide text-on-surface-variant">Contraseña actual</label>
                <PasswordField id="credentials-current-password" />
            </div>

            <div class="flex flex-col gap-1">
                <label for="credentials-new-password" class="font-label text-xs uppercase tracking-wide text-on-surface-variant">Nueva contraseña</label>
                <PasswordField id="credentials-new-password" />
            </div>

            <div class="flex flex-col gap-1">
                <label for="credentials-confirm-password" class="font-label text-xs uppercase tracking-wide text-on-surface-variant">Confirmar nueva contraseña</label>
                <PasswordField id="credentials-confirm-password" />
            </div>
        </div>

        <BaseButton type="button" class="account-credentials-card__update-password mt-4">Actualizar contraseña</BaseButton>
    </section>
</template>
