<script setup>
import { onMounted, useTemplateRef } from 'vue'
import { gsap } from 'gsap'
import AccessPanel from '@/components/home/AccessPanel.vue'
import { useAccessPanel } from '@/composables/useAccessPanel'

const { open: accessPanelOpen, tab: accessPanelTab, openPanel } = useAccessPanel()

const heroBg = useTemplateRef('heroBg')
const heroTitleTyped = useTemplateRef('heroTitleTyped')
const heroTagline = useTemplateRef('heroTagline')
const heroCta = useTemplateRef('heroCta')

defineExpose({ openPanel })

const HERO_TITLE = 'El último archivo de Clara'

onMounted(() => {
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
    }

    if (heroBg.value.complete) {
        playIntro()
    } else {
        heroBg.value.addEventListener('load', playIntro, { once: true })
    }
})
</script>

<template>  
    <section
        class="hero relative flex min-h-screen w-full items-center justify-center overflow-hidden transition-[padding] duration-1000 ease-out before:absolute before:inset-0 before:z-10 before:bg-linear-to-r before:from-surface/85 before:via-surface/60 before:to-surface/15 before:content-[''] motion-reduce:transition-none"
    :class="accessPanelOpen ? 'lg:pr-120' : ''">
        <img ref="heroBg" src="@/assets/images/home/hero.png" alt=""
            class="hero__bg absolute inset-0 z-0 h-full w-full object-cover" />

        <div class="hero__content relative z-20 flex flex-col items-center gap-6 px-6 text-center">
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
