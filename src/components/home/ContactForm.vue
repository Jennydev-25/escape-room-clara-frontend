<script setup>
import { nextTick, ref, useTemplateRef } from 'vue'
import BaseButton from '@/shared/BaseButton.vue'
import { useRecaptcha } from '@/composables/useRecaptcha'

const name = defineModel('name', { type: String, default: '' })
const email = defineModel('email', { type: String, default: '' })
const type = defineModel('type', { type: String, default: '' })
const message = defineModel('message', { type: String, default: '' })

const { renderWidget, getToken } = useRecaptcha()
const recaptchaContainer = useTemplateRef('recaptchaContainer')
const recaptchaVisible = ref(false)
let recaptchaWidgetId = null

const emit = defineEmits(['submit'])

async function handleSubmit() {
    if (!recaptchaVisible.value) {
        recaptchaVisible.value = true
        await nextTick()
        recaptchaWidgetId = await renderWidget(recaptchaContainer.value)
        return
    }

    emit('submit', { recaptchaToken: getToken(recaptchaWidgetId) })
}
</script>

<template>
    <form class="contact-form flex flex-col gap-4" @submit.prevent="handleSubmit">
        <div class="contact-form__row grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div class="contact-form__field flex flex-col gap-1">
                <label for="contact-name">Nombre</label>
                <input
                    id="contact-name"
                    type="text"
                    required
                    v-model="name"
                    class="w-full rounded-md border border-outline bg-surface-container px-3 py-2 text-on-surface focus:border-primary focus:outline-none"
                >
            </div>

            <div class="contact-form__field flex flex-col gap-1">
                <label for="contact-email">Email</label>
                <input
                    id="contact-email"
                    type="email"
                    required
                    v-model="email"
                    class="w-full rounded-md border border-outline bg-surface-container px-3 py-2 text-on-surface focus:border-primary focus:outline-none"
                >
            </div>
        </div>

        <div class="contact-form__field flex flex-col gap-1">
            <label for="contact-type">Tipo de mensaje</label>
            <select
                id="contact-type"
                required
                v-model="type"
                class="w-full rounded-md border border-outline bg-surface-container px-3 py-2 text-on-surface focus:border-primary focus:outline-none"
            >
                <option value="" disabled>Selecciona una opción</option>
                <option value="QUESTION">Ayuda/Preguntas</option>
                <option value="BUG">Errores/Incidencias</option>
                <option value="SUGGESTION">Sugerencias</option>
            </select>
        </div>

        <div class="contact-form__field flex flex-col gap-1">
            <label for="contact-message">Mensaje</label>
            <textarea
                id="contact-message"
                rows="3"
                required
                v-model="message"
                class="w-full rounded-md border border-outline bg-surface-container px-3 py-2 text-on-surface focus:border-primary focus:outline-none"
            ></textarea>
        </div>

        <div v-if="recaptchaVisible" id="contact-recaptcha" ref="recaptchaContainer" class="contact-form__recaptcha flex justify-center"></div>

        <BaseButton type="submit" class="contact-form__submit">
            Enviar mensaje
        </BaseButton>
    </form>
</template>
