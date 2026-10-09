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

// "Home" se carga de forma lazy (ruta con import() dinámico), así que
// app.mount() vuelve antes de que Hero/Story existan todavía. Esperamos a
// que el router termine de resolver la navegación inicial y a que Vue
// pinte esa vista (nextTick) para que los ScrollTrigger ya existan; y si
// además hay imágenes (fotos de Story, fondos...) que aún no cargaron,
// esperamos también al evento "load" antes de recalcular sus posiciones.
router.isReady().then(() => {
    nextTick(() => {
        if (document.readyState === 'complete') {
            ScrollTrigger.refresh()
        } else {
            window.addEventListener('load', () => ScrollTrigger.refresh(), { once: true })
        }
    })
})
