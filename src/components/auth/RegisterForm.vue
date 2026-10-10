<script setup>
import { nextTick, ref, useTemplateRef } from 'vue'
import PasswordField from '@/shared/PasswordField.vue'
import BaseButton from '@/shared/BaseButton.vue'
import { useRecaptcha } from '@/composables/useRecaptcha'

const email = defineModel('email', { type: String, default: '' })
const password = defineModel('password', { type: String, default: '' })
const confirmPassword = defineModel('confirmPassword', { type: String, default: '' })

const confirmPasswordVisible = ref(false)

const { renderWidget, getToken } = useRecaptcha()
const recaptchaContainer = useTemplateRef('recaptchaContainer')
let recaptchaWidgetId = null

async function revealConfirmPassword() {
    confirmPasswordVisible.value = true

    if (recaptchaWidgetId === null) {
        await nextTick()
        recaptchaWidgetId = await renderWidget(recaptchaContainer.value)
    }
}

const emit = defineEmits(['submit'])

function handleSubmit() {
    emit('submit', { recaptchaToken: getToken(recaptchaWidgetId) })
}
</script>

<template>
    <form class="register-form flex flex-col gap-4" @submit.prevent="handleSubmit">
        <div class="register-form__field flex flex-col gap-1">
            <label for="register-email">Email</label>
            <input
                id="register-email"
                type="email"
                required
                v-model="email"
                class="w-full rounded-md border border-outline bg-surface-container px-3 py-2 text-on-surface focus:border-primary focus:outline-none"
            >
        </div>

        <div class="register-form__field flex flex-col gap-1">
            <label for="register-password">Contraseña</label>
            <PasswordField
                id="register-password"
                required
                minlength="8"
                v-model="password"
                @focus="revealConfirmPassword"
            />
        </div>

        <div v-if="confirmPasswordVisible" class="register-form__field flex flex-col gap-1">
            <label for="register-confirm-password">Confirma tu contraseña</label>
            <PasswordField id="register-confirm-password" required minlength="8" v-model="confirmPassword" />
        </div>

        <div v-if="confirmPasswordVisible" id="register-recaptcha" ref="recaptchaContainer" class="register-form__recaptcha flex justify-center"></div>

        <BaseButton type="submit" class="register-form__submit">
            Crear cuenta
        </BaseButton>
    </form>
</template>
