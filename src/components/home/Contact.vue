<script setup>
import { onMounted, onUnmounted, ref, useTemplateRef } from 'vue'
import { gsap } from 'gsap'
import ContactForm from '@/components/home/ContactForm.vue'
import ContactRepository from '@/core/apis/contact/ContactRepository'
import ContactService from '@/core/apis/contact/ContactService'

const contactSection = useTemplateRef('contactSection')

const showForm = ref(false)
const sent = ref(false)

const name = ref('')
const email = ref('')
const type = ref('')
const message = ref('')

const contactService = new ContactService(new ContactRepository())
const contactStatus = ref(null)

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

async function handleSubmit({ recaptchaToken }) {
    try {
        const contact = await contactService.send({
            name: name.value,
            email: email.value,
            type: type.value,
            message: message.value,
            recaptchaToken,
        })

        sent.value = true
        contactStatus.value = { type: 'success', message: contact.getMessage() }

        closeTimeout = setTimeout(() => {
            showForm.value = false
            sent.value = false
            contactStatus.value = null
            resetFields()
        }, 3000)
    } catch (error) {
        contactStatus.value = { type: 'error', message: error.message }
    }
}

let contactScrollTrigger = null

onMounted(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const textLines = contactSection.value.querySelectorAll('.contact__reveal')

    const timeline = gsap.timeline({
        scrollTrigger: {
            trigger: contactSection.value,
            start: 'top 75%',
            toggleActions: 'play none none none',
        }
    })
        .from(textLines, { opacity: 0, y: 40, duration: 1, ease: 'power2.out', stagger: 0.25 })

    contactScrollTrigger = timeline.scrollTrigger
})

onUnmounted(() => {
    clearTimeout(closeTimeout)
    contactScrollTrigger?.kill()
})
</script>

<template>
    <section id="contacto" ref="contactSection"
        class="contact relative flex min-h-96 flex-col justify-center px-6 pt-8 sm:pt-12 pb-16 sm:pb-24 transition-[padding] duration-1000 ease-out motion-reduce:transition-none"
        :class="showForm ? 'lg:min-h-[36rem] lg:pr-120' : ''"
    >
        <div class="contact__container mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
            <h2 class="contact__reveal contact__heading font-display text-2xl text-on-surface sm:text-3xl">
                Contacto
            </h2>

            <p class="contact__reveal contact__text font-body text-base text-on-surface-variant sm:text-lg">
                ¿Tienes alguna duda, te has encontrado un error en el juego, te has quedado atascada/o en
                alguna prueba o no sabes cómo avanzar en algún punto? ¿O simplemente te apetece charlar
                sobre el juego, proponerme una mejora o hablarme de una colaboración? No dudes en
                preguntar, estaré encantada de responderte.
            </p>

            <button
                type="button"
                class="contact__reveal contact__cta font-label mt-4 rounded-md border border-primary px-8 py-3 uppercase tracking-widest text-primary transition-colors hover:bg-primary hover:text-on-primary"
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
                class="contact__card relative z-30 mx-auto mt-8 w-[90%] max-w-md rounded-2xl border border-white/20 bg-surface/15 p-6 text-left shadow-2xl backdrop-blur-2xl backdrop-saturate-150 lg:absolute lg:right-16 lg:top-20 lg:mt-0"
                role="region"
                aria-label="Formulario de contacto"
            >
                <p
                    v-if="sent"
                    class="contact__sent font-body text-center text-on-surface"
                    role="status"
                    aria-live="polite"
                >
                    {{ contactStatus?.message }}
                </p>
                <template v-else>
                    <p
                        v-if="contactStatus"
                        class="contact__feedback font-body mb-2 text-center text-error"
                        role="status"
                        aria-live="polite"
                    >
                        {{ contactStatus.message }}
                    </p>
                    <ContactForm
                        v-model:name="name"
                        v-model:email="email"
                        v-model:type="type"
                        v-model:message="message"
                        @submit="handleSubmit"
                    />
                </template>
            </div>
        </Transition>
    </section>
</template>
