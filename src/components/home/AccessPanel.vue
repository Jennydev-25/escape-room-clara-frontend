<script setup>
const open = defineModel('open', { type: Boolean, default: false })
const tab = defineModel('tab', { type: String, default: 'login' })

function close() {
    open.value = false
}
</script>

<template>
  <Transition
    enter-active-class="transition duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] motion-reduce:transition-none"
    enter-from-class="opacity-0 scale-95 translate-y-2"
    enter-to-class="opacity-100 scale-100 translate-y-0"
    leave-active-class="transition duration-200 ease-out motion-reduce:transition-none"
    leave-from-class="opacity-100 scale-100"
    leave-to-class="opacity-0 scale-95"
  >
    <div
      v-if="open"
      class="access-panel fixed right-4 top-1/2 z-30 w-[90%] max-w-sm -translate-y-1/2 rounded-2xl border border-white/20 bg-surface/15 p-6 shadow-2xl backdrop-blur-2xl backdrop-saturate-150 sm:right-8 lg:right-16"
      role="dialog"
      aria-labelledby="access-panel-title"
    >
      <div class="access-panel__header flex items-center justify-between">
        <h2 id="access-panel-title" class="access-panel__title text-2xl font-semibold">
          {{ tab === 'login' ? 'Acceder' : 'Crear cuenta' }}
        </h2>
        <button type="button" class="access-panel__close" aria-label="Cerrar" @click="close">
          &times;
        </button>
      </div>

      <div class="access-panel__tabs mt-6 flex gap-4" role="tablist">
        <button type="button" role="tab" :aria-selected="tab === 'login'" class="access-panel__tab" @click="tab = 'login'">
          Iniciar sesión
        </button>
        <button type="button" role="tab" :aria-selected="tab === 'register'" class="access-panel__tab" @click="tab = 'register'">
          Registrarme
        </button>
      </div>

      <div class="access-panel__content mt-6">
        <!-- aquí van los campos de cada formulario -->
      </div>
    </div>
  </Transition>
</template>
