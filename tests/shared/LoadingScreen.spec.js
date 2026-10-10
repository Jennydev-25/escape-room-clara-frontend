import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import LoadingScreen from '@/shared/LoadingScreen.vue'

describe('LoadingScreen', () => {
    it('renders the title text', () => {
        const wrapper = mount(LoadingScreen, { props: { title: 'Bienvenid@' } })

        expect(wrapper.text()).toContain('Bienvenid@')
    })

    it('renders the message when provided', () => {
        const wrapper = mount(LoadingScreen, { props: { title: 'Bienvenid@', message: 'Cargando investigación...' } })

        expect(wrapper.text()).toContain('Cargando investigación...')
    })
})
