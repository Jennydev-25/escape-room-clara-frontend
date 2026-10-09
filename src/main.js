import './assets/styles/style.css'
import { createApp, nextTick } from 'vue'
import { createPinia } from 'pinia'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { TextPlugin } from 'gsap/TextPlugin'

import App from './App.vue'
import router from './router'

gsap.registerPlugin(ScrollTrigger, TextPlugin)

const lenis = new Lenis()
lenis.on('scroll', ScrollTrigger.update)
gsap.ticker.add((time) => {
    lenis.raf(time * 1000)
})
gsap.ticker.lagSmoothing(0)

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')

router.isReady().then(() => {
    nextTick(() => {
        ScrollTrigger.refresh()
    })
})

window.addEventListener('load', () => ScrollTrigger.refresh())
setTimeout(() => ScrollTrigger.refresh(), 1000)
