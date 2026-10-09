<script setup>
import { onMounted, onUnmounted, useTemplateRef } from 'vue'
import { gsap } from 'gsap'
import AccessPanel from '@/components/home/AccessPanel.vue'
import { useAccessPanel } from '@/composables/useAccessPanel'

const { open: accessPanelOpen, tab: accessPanelTab, openPanel } = useAccessPanel()

const heroSection = useTemplateRef('heroSection')
const heroBg = useTemplateRef('heroBg')
const heroContent = useTemplateRef('heroContent')
const heroTitleTyped = useTemplateRef('heroTitleTyped')
const heroTagline = useTemplateRef('heroTagline')
const heroCta = useTemplateRef('heroCta')
const lampGlow = useTemplateRef('lampGlow')

defineExpose({ openPanel })

const HERO_TITLE = 'El último archivo de Clara'
const HERO_IMAGE_SIZE = { width: 1678, height: 937 }
const LAMP_IMAGE_POSITION = { x: 508, y: 188 }

function positionLampGlow() {
    if (!heroBg.value || !lampGlow.value) return

    const container = heroBg.value.getBoundingClientRect()
    const scale = Math.max(container.width / HERO_IMAGE_SIZE.width, container.height / HERO_IMAGE_SIZE.height)
    const renderedWidth = HERO_IMAGE_SIZE.width * scale
    const renderedHeight = HERO_IMAGE_SIZE.height * scale
    const offsetX = (container.width - renderedWidth) / 2
    const offsetY = (container.height - renderedHeight) / 2

    lampGlow.value.style.left = `${offsetX + LAMP_IMAGE_POSITION.x * scale}px`
    lampGlow.value.style.top = `${offsetY + LAMP_IMAGE_POSITION.y * scale}px`
}

const LAMP_FLICKER_PATTERNS = [
    // doble parpadeo rápido
    (tl) => tl
        .to(lampGlow.value, { opacity: 0.08, duration: 0.07 })
        .to(lampGlow.value, { opacity: 1, duration: 0.07 })
        .to(lampGlow.value, { opacity: 0.1, duration: 0.09 })
        .to(lampGlow.value, { opacity: 1, duration: 0.12 }),
    // se apaga poco a poco y vuelve de golpe
    (tl) => tl
        .to(lampGlow.value, { opacity: 0.15, duration: 0.6, ease: 'power1.in' })
        .to(lampGlow.value, { opacity: 1, duration: 0.15 }),
    // casi se apaga del todo, un instante a oscuras, y vuelve
    (tl) => tl
        .to(lampGlow.value, { opacity: 0.03, duration: 0.2 })
        .to(lampGlow.value, { opacity: 0.03, duration: 0.3 })
        .to(lampGlow.value, { opacity: 1, duration: 0.2 }),
    // tres parpadeos cortos espaciados
    (tl) => tl
        .to(lampGlow.value, { opacity: 0.2, duration: 0.09 })
        .to(lampGlow.value, { opacity: 1, duration: 0.09 })
        .to(lampGlow.value, { opacity: 0.2, duration: 0.09 }, '+=0.25')
        .to(lampGlow.value, { opacity: 1, duration: 0.09 }),
]

let flickerStopped = false
let activeFlickerTween = null
let heroParallaxTrigger = null

function playFlickerSequence() {
    if (flickerStopped) return

    activeFlickerTween = gsap.timeline({
        onComplete: () => {
            activeFlickerTween = gsap.delayedCall(gsap.utils.random(1, 2.5), playFlickerSequence)
        }
    })
    gsap.utils.random(LAMP_FLICKER_PATTERNS)(activeFlickerTween)
}

onMounted(() => {
    positionLampGlow()
    window.addEventListener('resize', positionLampGlow)

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) {
        heroTitleTyped.value.textContent = HERO_TITLE
        return
    }

    function playIntro() {
        gsap.timeline({ delay: 0.4 })
            .to(heroTitleTyped.value, { duration: 3.2, text: HERO_TITLE, ease: 'none' })
            .from(heroTagline.value, { opacity: 0, y: 24, duration: 1.4, ease: 'power2.out' }, '-=0.2')
            .from(heroCta.value, { opacity: 0, y: 24, duration: 1.4, ease: 'power2.out' }, '-=0.3')
        playFlickerSequence()
    }

    if (heroBg.value.complete) {
        playIntro()
    } else {
        heroBg.value.addEventListener('load', playIntro, { once: true })
    }

    // Parallax de verdad: la foto hace zoom y sube despacio, el contenido sube
    // más rápido y se desvanece. Al ir a distinta velocidad se nota la profundidad.
    const parallaxTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: heroSection.value,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
            onUpdate: positionLampGlow,
        }
    })
        .to(heroBg.value, { scale: 1.15, y: -40, ease: 'none' }, 0)
        .to(heroContent.value, { y: -70, opacity: 0, ease: 'none' }, 0)

    heroParallaxTrigger = parallaxTimeline.scrollTrigger
})

onUnmounted(() => {
    window.removeEventListener('resize', positionLampGlow)
    flickerStopped = true
    activeFlickerTween?.kill()
    heroParallaxTrigger?.kill()
})
</script>

<template>  
    <section
        ref="heroSection"
        class="hero relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden transition-[padding] duration-1000 ease-out before:absolute before:inset-0 before:z-10 before:bg-linear-to-r before:from-surface/85 before:via-surface/60 before:to-surface/15 before:content-[''] motion-reduce:transition-none"
    :class="accessPanelOpen ? 'lg:pr-120' : ''">
        <img ref="heroBg" src="@/assets/images/home/hero.png" alt=""
            class="hero__bg absolute inset-0 z-0 h-full w-full object-cover" />

        <div
            ref="lampGlow"
            aria-hidden="true"
            class="hero__lamp-glow pointer-events-none absolute h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full blur-xl"
            style="z-index: 15; background: radial-gradient(circle, rgba(255, 214, 140, 0.9) 0%, rgba(255, 214, 140, 0) 70%);"
        ></div>

        <div ref="heroContent" class="hero__content relative z-20 flex flex-col items-center gap-6 px-6 text-center">
            <h1 class="hero__title font-display text-4xl uppercase text-on-surface sm:text-5xl md:text-6xl">
                <span class="sr-only">El último archivo de Clara</span>
                <span ref="heroTitleTyped" aria-hidden="true"></span>
            </h1>

            <p ref="heroTagline" class="hero__tagline font-body max-w-md text-base text-on-surface-variant sm:text-lg">
                Lo que ella no llegó a contar, alguien tiene que terminarlo...
            </p>

            <button ref="heroCta" type="button" @click="openPanel('register')"
                class="hero__cta font-label mt-4 rounded-md border border-primary px-8 py-3 uppercase tracking-widest text-primary transition-colors hover:bg-primary hover:text-on-primary">
                Investigar
            </button>
        </div>

        <AccessPanel v-model:open="accessPanelOpen" v-model:tab="accessPanelTab" />
    </section>
</template>
