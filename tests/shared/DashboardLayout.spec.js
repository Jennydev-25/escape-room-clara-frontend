import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import DashboardLayout from '@/shared/DashboardLayout.vue'

describe('DashboardLayout', () => {
    it('renders the player alias in the header', () => {
        const wrapper = mount(DashboardLayout, {
            props: { activeSection: 'inicio', playerAlias: 'marta_v' },
        })

        expect(wrapper.text()).toContain('marta_v')
    })

    it.each([
        ['inicio', 'Resumen'],
        ['perfil', 'Mi perfil'],
    ])('marks the "%s" section link as the current page via aria-current', (activeSection, linkText) => {
        const wrapper = mount(DashboardLayout, {
            props: { activeSection, playerAlias: 'marta_v' },
        })

        const activeLink = wrapper.findAll('a').find((link) => link.text() === linkText)

        expect(activeLink.attributes('aria-current')).toBe('page')
    })

    it('renders the default slot content', () => {
        const wrapper = mount(DashboardLayout, {
            props: { activeSection: 'inicio', playerAlias: 'marta_v' },
            slots: { default: '<p>contenido de prueba</p>' },
        })

        expect(wrapper.find('p').text()).toBe('contenido de prueba')
    })
})
