<script setup>
import { ref } from 'vue'
import PasswordField from '@/shared/PasswordField.vue'
import BaseButton from '@/shared/BaseButton.vue'

const fullName = defineModel('fullName', { type: String, default: '' })
const alias = defineModel('alias', { type: String, default: '' })
const currentPassword = defineModel('currentPassword', { type: String, default: '' })
const newPassword = defineModel('newPassword', { type: String, default: '' })
const confirmPassword = defineModel('confirmPassword', { type: String, default: '' })

// la misma longitud mínima que pide el back
const MIN_PASSWORD_LENGTH = 8

const emit = defineEmits(['submit', 'submit-password'])

const isEditing = ref(false)

// avisa a la vista y vuelve al estado cerrado
function submit() {
    emit('submit')
    isEditing.value = false
}

// igual con el formulario de la contraseña
function submitPassword() {
    emit('submit-password')
    isEditing.value = false
}
</script>

<template>
    <section class="account-credentials-card relative min-h-0 overflow-hidden rounded-2xl border border-outline/30 bg-surface-container p-8 lg:h-full">
        <div v-if="!isEditing" class="flex h-full flex-col items-center justify-center gap-4 text-center">
            <p class="account-credentials-card__edit-hint font-body text-sm text-on-surface-variant">¿Algo que corregir en tus credenciales o tus datos de acceso? Actualízalo aquí.</p>
            <BaseButton type="button" class="account-credentials-card__edit-toggle" @click="isEditing = true">Editar mis datos</BaseButton>
        </div>

        <button
            v-if="isEditing"
            type="button"
            class="account-credentials-card__close absolute right-6 top-6 flex h-8 w-8 items-center justify-center rounded-full text-on-surface-variant transition-colors hover:bg-surface hover:text-on-surface"
            aria-label="Cerrar"
            @click="isEditing = false"
        >
            &times;
        </button>

        <div v-if="isEditing" class="account-credentials-card__columns grid grid-cols-2 gap-0">
            <form class="account-credentials-card__access flex flex-col gap-4 pr-6" @submit.prevent="submit">
                <h2 class="font-display text-xl text-on-surface">Datos de acceso y credenciales</h2>

                <div class="account-credentials-card__fields flex flex-col gap-4">
                    <div class="flex flex-col gap-1">
                        <label for="credentials-full-name" class="font-label text-xs uppercase tracking-wide text-on-surface-variant">Nombre completo</label>
                        <input
                            id="credentials-full-name"
                            type="text"
                            v-model="fullName"
                            class="w-full rounded-md border border-outline bg-surface px-3 py-2 text-on-surface focus:border-primary focus:outline-none"
                        >
                    </div>

                    <div class="flex flex-col gap-1">
                        <label for="credentials-alias" class="font-label text-xs uppercase tracking-wide text-on-surface-variant">Alias</label>
                        <input
                            id="credentials-alias"
                            type="text"
                            v-model="alias"
                            class="w-full rounded-md border border-outline bg-surface px-3 py-2 text-on-surface focus:border-primary focus:outline-none"
                        >
                    </div>
                </div>

                <BaseButton type="submit" class="account-credentials-card__save mt-auto">Guardar cambios</BaseButton>
            </form>

            <form class="account-credentials-card__password-section flex flex-col gap-4 border-l border-outline/30 pl-6" @submit.prevent="submitPassword">
                <h3 class="font-display text-xl text-on-surface">Cambiar contraseña</h3>

                <div class="account-credentials-card__password flex flex-col gap-4">
                    <div class="flex flex-col gap-1">
                        <label for="credentials-current-password" class="font-label text-xs uppercase tracking-wide text-on-surface-variant">Contraseña actual</label>
                        <PasswordField id="credentials-current-password" required v-model="currentPassword" />
                    </div>

                    <div class="flex flex-col gap-1">
                        <label for="credentials-new-password" class="font-label text-xs uppercase tracking-wide text-on-surface-variant">Nueva contraseña</label>
                        <PasswordField id="credentials-new-password" required :minlength="MIN_PASSWORD_LENGTH" v-model="newPassword" />
                    </div>

                    <div class="flex flex-col gap-1">
                        <label for="credentials-confirm-password" class="font-label text-xs uppercase tracking-wide text-on-surface-variant">Confirmar nueva contraseña</label>
                        <PasswordField id="credentials-confirm-password" required :minlength="MIN_PASSWORD_LENGTH" v-model="confirmPassword" />
                    </div>
                </div>

                <BaseButton type="submit" class="account-credentials-card__update-password mt-auto">Actualizar contraseña</BaseButton>
            </form>
        </div>
    </section>
</template>
