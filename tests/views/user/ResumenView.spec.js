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
})
