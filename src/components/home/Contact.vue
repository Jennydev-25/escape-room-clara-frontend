<script setup>
import { onUnmounted, ref } from 'vue'
import ContactForm from '@/components/home/ContactForm.vue'

const showForm = ref(false)
const sent = ref(false)

const name = ref('')
const email = ref('')
const type = ref('')
const message = ref('')

let closeTimeout = null

function resetFields() {
    name.value = ''
    email.value = ''
    type.value = ''
    message.value = ''
}

function toggleForm() {
    showForm.value = !showForm.value
}

function handleSubmit() {
    sent.value = true

    closeTimeout = setTimeout(() => {
        showForm.value = false
        sent.value = false
        resetFields()
    }, 3000)
}

onUnmounted(() => {
    clearTimeout(closeTimeout)
})
</script>

<template>
    <section id="contacto"
        class="contact relative flex min-h-136 flex-col justify-center overflow-hidden px-6 pt-16 sm:pt-24 pb-16 sm:pb-24 transition-[padding] duration-1000 ease-out motion-reduce:transition-none"
        :class="showForm ? 'lg:pr-120' : ''"
    >
        <div class="contact__container mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
            <h2 class="contact__heading font-display text-2xl text-on-surface sm:text-3xl">
                Contacto
            </h2>

            <p class="contact__text font-body text-base text-on-surface-variant sm:text-lg">
                ¿Tienes alguna duda, te has encontrado un error en el juego, te has quedado atascada/o en
                alguna prueba o no sabes cómo avanzar en algún punto? ¿O simplemente te apetece charlar
                sobre el juego, proponerme una mejora o hablarme de una colaboración? No dudes en
                preguntar, estaré encantada de responderte.
            </p>

            <button
                type="button"
                class="contact__cta font-label mt-4 rounded-md border border-primary px-8 py-3 uppercase tracking-widest text-primary transition-colors hover:bg-primary hover:text-on-primary"
                :aria-expanded="showForm"
                aria-controls="contact-form-card"
                @click="toggleForm"
            >
                {{ showForm ? 'Cerrar' : 'Escribir' }}
            </button>
        </div>

        <Transition
            enter-active-class="transition duration-1000 ease-out motion-reduce:transition-none"
            enter-from-class="opacity-0 scale-95 translate-y-8 lg:translate-y-0 lg:translate-x-8"
            enter-to-class="opacity-100 scale-100 translate-y-0 translate-x-0"
            leave-active-class="transition duration-200 ease-out motion-reduce:transition-none"
            leave-from-class="opacity-100 scale-100"
            leave-to-class="opacity-0 scale-95"
        >
            <div
                v-if="showForm"
                id="contact-form-card"
                class="contact__card relative z-30 mx-auto mt-8 w-[90%] max-w-md rounded-2xl border border-white/20 bg-surface/15 p-6 text-left shadow-2xl backdrop-blur-2xl backdrop-saturate-150 lg:absolute lg:right-16 lg:top-[60%] lg:mt-0 lg:-translate-y-1/2"
                role="region"
                aria-label="Formulario de contacto"
            >
                <p
                    v-if="sent"
                    class="contact__sent font-body text-center text-on-surface"
                    role="status"
                    aria-live="polite"
                >
                    Mensaje enviado correctamente
                </p>
                <ContactForm
                    v-else
                    v-model:name="name"
                    v-model:email="email"
                    v-model:type="type"
                    v-model:message="message"
                    @submit="handleSubmit"
                />
            </div>
        </Transition>
    </section>
</template>
