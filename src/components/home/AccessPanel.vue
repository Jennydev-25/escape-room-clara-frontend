<script setup>
import { ref } from 'vue'
import LoginForm from '@/components/auth/LoginForm.vue'
import RegisterForm from '@/components/auth/RegisterForm.vue'
import AuthRepository from '@/core/apis/auth/AuthRepository'
import AuthService from '@/core/apis/auth/AuthService'
import { useAuthStore } from '@/stores/auth'

const open = defineModel('open', { type: Boolean, default: false })
const tab = defineModel('tab', { type: String, default: 'login' })

const loginEmail = ref('')
const loginPassword = ref('')

const registerEmail = ref('')
const registerPassword = ref('')
const registerConfirmPassword = ref('')

const authService = new AuthService(new AuthRepository())
const authStore = useAuthStore()
const status = ref(null)

async function handleRegisterSubmit({ recaptchaToken }) {
    try {
        const register = await authService.register({
            email: registerEmail.value,
            password: registerPassword.value,
            confirmPassword: registerConfirmPassword.value,
            recaptchaToken,
        })
        status.value = { type: 'success', message: register.getMessage() }
    } catch (error) {
        status.value = { type: 'error', message: error.message }
    }
}

async function handleLoginSubmit() {
    try {
        const login = await authService.login(loginEmail.value, loginPassword.value)
        authStore.setSession(login.getToken(), login.getRefreshToken())
        close()
    } catch (error) {
        status.value = { type: 'error', message: error.message }
    }
}

function close() {
    open.value = false
}
</script>

<template>
  <Transition
    enter-active-class="transition duration-1000 ease-out motion-reduce:transition-none"
    enter-from-class="opacity-0 scale-95 translate-y-8 lg:translate-y-0 lg:translate-x-8"
    enter-to-class="opacity-100 scale-100 translate-y-0 translate-x-0"
    leave-active-class="transition duration-200 ease-out motion-reduce:transition-none"
    leave-from-class="opacity-100 scale-100"
    leave-to-class="opacity-0 scale-95"
  >
    <div
      v-if="open"
      class="access-panel relative z-30 mx-auto mt-8 w-[90%] max-w-sm rounded-2xl border border-white/20 bg-surface/15 p-6 shadow-2xl backdrop-blur-2xl backdrop-saturate-150 lg:absolute lg:right-16 lg:top-1/2 lg:mt-0 lg:-translate-y-1/2"
      role="dialog"
      aria-labelledby="access-panel-title"
    >
      <div class="access-panel__header flex items-center justify-between">
        <h2 id="access-panel-title" class="access-panel__title font-display text-2xl text-on-surface">
          {{ tab === 'login' ? 'Acceder' : 'Crear cuenta' }}
        </h2>
        <button
          type="button"
          class="access-panel__close flex h-8 w-8 items-center justify-center rounded-full text-on-surface-variant transition-colors hover:bg-white/15 hover:text-on-surface active:bg-white/25"
          aria-label="Cerrar"
          @click="close"
        >
          &times;
        </button>
      </div>

      <div class="access-panel__tabs mt-6 flex gap-4 border-b border-outline" role="tablist">
        <button
          type="button"
          role="tab"
          :aria-selected="tab === 'login'"
          class="access-panel__tab border-b-2 pb-2 transition-colors"
          :class="tab === 'login' ? 'border-primary text-primary' : 'border-transparent text-on-surface-variant hover:text-on-surface'"
          @click="tab = 'login'"
        >
          Iniciar sesión
        </button>
        <button
          type="button"
          role="tab"
          :aria-selected="tab === 'register'"
          class="access-panel__tab border-b-2 pb-2 transition-colors"
          :class="tab === 'register' ? 'border-primary text-primary' : 'border-transparent text-on-surface-variant hover:text-on-surface'"
          @click="tab = 'register'"
        >
          Registrarme
        </button>
      </div>

      <p
        v-if="status"
        class="access-panel__feedback mt-4"
        :class="status.type === 'success' ? 'text-primary' : 'text-error'"
        role="status"
        aria-live="polite"
      >
        {{ status.message }}
      </p>

      <div class="access-panel__content mt-6">
        <LoginForm
          v-if="tab === 'login'"
          v-model:email="loginEmail"
          v-model:password="loginPassword"
          @submit="handleLoginSubmit"
        />
        <RegisterForm
          v-else
          v-model:email="registerEmail"
          v-model:password="registerPassword"
          v-model:confirmPassword="registerConfirmPassword"
          @submit="handleRegisterSubmit"
        />
      </div>
    </div>
  </Transition>
</template>
