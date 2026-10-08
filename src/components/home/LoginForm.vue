<script setup>
import PasswordField from '@/shared/PasswordField.vue'

const email = defineModel('email', { type: String, default: '' })
const password = defineModel('password', { type: String, default: '' })

defineEmits(['submit'])
</script>

<template>
    <form class="login-form flex flex-col gap-4" @submit.prevent="$emit('submit')">
        <div class="login-form__field flex flex-col gap-1">
            <label for="login-email">Email</label>
            <input id="login-email" type="email" required v-model="email">
        </div>

        <div class="login-form__field flex flex-col gap-1">
            <label for="login-password">Contraseña</label>
            <PasswordField id="login-password" required v-model="password" />
        </div>

        <button type="submit" class="login-form__submit mt-2 rounded-md border border-primary px-6 py-2 uppercase tracking-widest text-primary transition-colors hover:bg-primary hover:text-on-primary">
            Iniciar sesión
        </button>
    </form>
</template>
