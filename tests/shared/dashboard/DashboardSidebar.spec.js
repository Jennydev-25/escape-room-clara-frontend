import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import router from '@/router'
import DashboardSidebar from '@/shared/dashboard/DashboardSidebar.vue'

describe('DashboardSidebar', () => {
    it.each([
        ['Resumen', '/resumen'],
        ['Mi perfil', '/perfil'],
    ])('links "%s" to the real route', async (linkText, path) => {
        const wrapper = mount(DashboardSidebar, {
            global: { plugins: [router] },
        })

        const link = wrapper.findAll('a').find((a) => a.text() === linkText)

        expect(link.attributes('href')).toBe(path)
    })

    it('renders a logout button', () => {
        const wrapper = mount(DashboardSidebar, {
            props: { activeSection: 'inicio' },
        })

        const button = wrapper.find('button')

        expect(button.text()).toBe('Cerrar sesión')
    })
})
