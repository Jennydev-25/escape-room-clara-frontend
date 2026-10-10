import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import router from '@/router'
import ResumenView from '@/views/user/ResumenView.vue'

describe('ResumenView', () => {
    it('greets the player by their alias', () => {
        const wrapper = mount(ResumenView, {
            global: { plugins: [router] },
        })

        expect(wrapper.text()).toContain('Hola de nuevo, jugador_01')
    })

    it('renders the resumen subtitle', () => {
        const wrapper = mount(ResumenView, {
            global: { plugins: [router] },
        })

        expect(wrapper.text()).toContain('Aquí tienes un resumen de tu progreso en el caso. El portátil de Clara guardará todo lo que vayas reconstruyendo.')
    })

    it('marks "Resumen" as the active section in the sidebar', () => {
        const wrapper = mount(ResumenView, {
            global: { plugins: [router] },
        })

        const activeLink = wrapper.find('[aria-current="page"]')
        expect(activeLink.text()).toBe('Resumen')
    })

    it('renders the case summary card heading', () => {
        const wrapper = mount(ResumenView, {
            global: { plugins: [router] },
        })

        expect(wrapper.text()).toContain('Sumario de la investigación')
        expect(wrapper.text()).toContain('Comenzar investigación')
        expect(wrapper.text()).toContain('Pendiente de inicio')
    })

    it('renders the chapter progress row', () => {
        const wrapper = mount(ResumenView, {
            global: { plugins: [router] },
        })

        expect(wrapper.text()).toContain('Capítulo 1 de 17')
        expect(wrapper.text()).toContain('0% completado')
    })

    it('renders the case info tiles', () => {
        const wrapper = mount(ResumenView, {
            global: { plugins: [router] },
        })

        expect(wrapper.text()).toContain('Tiempo en el caso')
        expect(wrapper.text()).toContain('00:00:00')
        expect(wrapper.text()).toContain('Carpeta activa')
        expect(wrapper.text()).toContain('Ninguna')
    })

    it('renders the start investigation button', () => {
        const wrapper = mount(ResumenView, {
            global: { plugins: [router] },
        })

        const button = wrapper.find('button')
        expect(button.text()).toContain('Comenzar')
    })
})
