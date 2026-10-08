<script setup>
import { onMounted, useTemplateRef } from 'vue'
import Hero from '@/components/home/Hero.vue'
import Story from '@/components/home/Story.vue'
import About from '@/components/home/About.vue'
import Contact from '@/components/home/Contact.vue'
import AccessPanel from '@/components/home/AccessPanel.vue'
import { useAccessPanel } from '@/composables/useAccessPanel'

const bgVideo = useTemplateRef('bgVideo')

const { open: accessPanelOpen, tab: accessPanelTab, openPanel } = useAccessPanel()

function abrirAcceso(tab) {
    openPanel(tab)
}

onMounted(() => {
    if (bgVideo.value) {
        bgVideo.value.playbackRate = 0.4
    }
})
</script>

<template>
    <main>
        <Hero :panel-open="accessPanelOpen" @abrir-acceso="abrirAcceso" />
        <AccessPanel v-model:open="accessPanelOpen" v-model:tab="accessPanelTab" />
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
</template>
