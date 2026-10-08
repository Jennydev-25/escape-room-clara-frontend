<script setup>
import { onMounted, useTemplateRef } from 'vue'
import Header from '@/components/home/Header.vue'
import Hero from '@/components/home/Hero.vue'
import Story from '@/components/home/Story.vue'
import About from '@/components/home/About.vue'
import Contact from '@/components/home/Contact.vue'
import Footer from '@/components/home/Footer.vue'

const bgVideo = useTemplateRef('bgVideo')
const heroRef = useTemplateRef('heroRef')

function abrirAcceso(tab) {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    heroRef.value?.openPanel(tab)
}

onMounted(() => {
    if (bgVideo.value) {
        bgVideo.value.playbackRate = 0.4
    }
})
</script>

<template>
    <Header @abrir-acceso="abrirAcceso" />
    <main>
        <Hero ref="heroRef" />
        <div class="relative">
            <video ref="bgVideo" class="fixed inset-0 -z-10 h-full w-full object-cover motion-reduce:hidden" autoplay
                loop muted playsinline aria-hidden="true">
                <source src="@/assets/videos/home/sea-bg-loop.mp4" type="video/mp4" />
            </video>
            <div class="fixed inset-0 -z-10 bg-surface/85 motion-reduce:bg-surface"></div>

            <Story />
            <About />
            <Contact />
        </div>
    </main>
    <Footer />
</template>
