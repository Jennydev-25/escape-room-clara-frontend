import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import router from '@/router'
import DashboardLayout from '@/shared/dashboard/DashboardLayout.vue'

describe('DashboardLayout', () => {
    it('renders the default slot content', () => {
        const wrapper = mount(DashboardLayout, {
            global: { plugins: [router] },
            props: { activeSection: 'inicio', playerAlias: 'marta_v' },
            slots: { default: '<p>contenido de prueba</p>' },
        })

        expect(wrapper.find('p').text()).toBe('contenido de prueba')
    })

    it('renders the classified status next to the open session label', () => {
        const wrapper = mount(DashboardLayout, {
            global: { plugins: [router] },
            props: { activeSection: 'inicio', playerAlias: 'marta_v' },
        })

        const statusBar = wrapper.find('.dashboard-layout__status')

        expect(statusBar.text()).toContain('Sesión abierta')
        expect(statusBar.text()).toContain('Estado: clasificada')
    })
})
