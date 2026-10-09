<script setup>
import { onMounted, onUnmounted, useTemplateRef } from 'vue'
import { gsap } from 'gsap'

const storySection = useTemplateRef('storySection')
const storyPhoto1 = useTemplateRef('storyPhoto1')
const storyPhoto2 = useTemplateRef('storyPhoto2')
const storyPhoto3 = useTemplateRef('storyPhoto3')

let storyScrollTrigger = null

onMounted(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    // El texto "va saliendo" línea a línea (heading + párrafos + pregunta),
    // no todo de golpe: cada línea entra con un pequeño stagger, dando la
    // sensación de ir apareciendo progresivamente sin ser un tecleo letra a letra.
    const textLines = storySection.value.querySelectorAll('.story__reveal')

    const timeline = gsap.timeline({
        scrollTrigger: {
            trigger: storySection.value,
            start: 'top 75%',
            toggleActions: 'play none none none',
        }
    })
        .from(textLines, {
            opacity: 0,
            y: 28,
            duration: 1.3,
            ease: 'power2.out',
            stagger: 0.4,
        })
        // Las fotos "caen" desde arriba (y negativo -> 0) poco a poco, cada
        // una se queda un momento visible antes de que empiece la siguiente.
        .from(storyPhoto1.value, { opacity: 0, y: -60, duration: 1.3, ease: 'power2.out' }, 0.9)
        .from(storyPhoto2.value, { opacity: 0, y: -60, duration: 1.3, ease: 'power2.out' }, 2.6)
        .from(storyPhoto3.value, { opacity: 0, y: -60, duration: 1.3, ease: 'power2.out' }, 4.3)

    storyScrollTrigger = timeline.scrollTrigger
})

onUnmounted(() => {
    storyScrollTrigger?.kill()
})
</script>

<template>
    <section id="el-caso" ref="storySection" class="story relative overflow-hidden px-6 pt-16 sm:pt-24">
        <div class="story__container mx-auto flex max-w-6xl flex-col gap-12 sm:flex-row sm:items-center sm:gap-16">
            <div class="story__content flex flex-1 flex-col gap-6 text-on-surface-variant">
                <h2 class="story__reveal story__heading font-display text-2xl text-on-surface sm:text-3xl">
                    Un pueblo pesquero. Un incendio. Una historia sin resolver.
                </h2>

                <p class="story__reveal story__paragraph font-body text-base sm:text-lg">
                    Todos los pueblos guardan leyendas. San Adrián de Mar guarda secretos.
                </p>

                <p class="story__reveal story__paragraph font-body text-base sm:text-lg">
                    En 2005, el engranaje que sostiene la vida del pueblo, su conservera, se incendia y se
                    cobra la vida de un trabajador. La investigación oficial habla de un accidente. El
                    pueblo sigue adelante, poco a poco, y nadie vuelve a preguntar. Hasta ahora.
                </p>

                <p class="story__reveal story__paragraph font-body text-base sm:text-lg">
                    Veinte años después, la periodista Clara Vega empezó a hacer las preguntas que nadie
                    quiso hacer entonces. Cuanto más se acercaba a la verdad, más peligroso se volvía seguir
                    buscándola.
                </p>

                <p class="story__reveal story__paragraph font-body text-base sm:text-lg">
                    Clara reunió pruebas. Siguió pistas. Se acercó más que nadie a la verdad. Y entonces,
                    desapareció, dejando solo un ordenador encendido y un secreto por resolver.
                </p>

                <p class="story__reveal story__paragraph font-body text-base sm:text-lg">
                    Ahora eres tú quien se sienta frente a esa pantalla. Descubre todo lo que ella descubrió.
                    Entiende todo lo que ella entendió. Termina lo que ella empezó.
                </p>

                <p class="story__reveal story__question font-display text-xl italic text-primary sm:text-2xl">
                    ¿Descubrirás la verdad?
                </p>
            </div>

            <div class="story__photos relative mx-auto w-72 sm:w-80 md:w-96">
                <img ref="storyPhoto1" src="@/assets/images/home/story-harbor.png" alt=""
                    class="story__photo relative z-0 w-full -rotate-6 shadow-xl" />
                <img ref="storyPhoto2" src="@/assets/images/home/story-fire.png" alt=""
                    class="story__photo absolute left-0 top-0 z-10 w-full translate-x-4 translate-y-6 rotate-3 shadow-xl" />
                <img ref="storyPhoto3" src="@/assets/images/home/story-laptop.png" alt=""
                    class="story__photo absolute left-0 top-0 z-20 w-full translate-x-8 translate-y-12 -rotate-2 shadow-xl" />
            </div>
        </div>
    </section>
</template>
