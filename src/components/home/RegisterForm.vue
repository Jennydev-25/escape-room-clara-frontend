<script setup>
import { ref } from 'vue'
import PasswordField from '@/shared/PasswordField.vue'

const email = defineModel('email', { type: String, default: '' })
const password = defineModel('password', { type: String, default: '' })
const confirmPassword = defineModel('confirmPassword', { type: String, default: '' })

const confirmPasswordVisible = ref(false)

function revealConfirmPassword() {
    confirmPasswordVisible.value = true
}

defineEmits(['submit'])
</script>

<template>
    <form class="register-form flex flex-col gap-4" @submit.prevent="$emit('submit')">
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

        <button type="submit" class="register-form__submit mt-2 rounded-md border border-primary px-6 py-2 uppercase tracking-widest text-primary transition-colors hover:bg-primary hover:text-on-primary">
            Crear cuenta
        </button>
    </form>
</template>
