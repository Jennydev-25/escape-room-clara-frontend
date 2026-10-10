import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import router from '@/router'
import DashboardHeader from '@/shared/dashboard/DashboardHeader.vue'

describe('DashboardHeader', () => {
    it('renders the player alias', () => {
        const wrapper = mount(DashboardHeader, {
            global: { plugins: [router] },
            props: { playerAlias: 'marta_v' },
        })

        expect(wrapper.text()).toContain('marta_v')
    })

    it('links the logo to the home route', () => {
        const wrapper = mount(DashboardHeader, {
            global: { plugins: [router] },
            props: { playerAlias: 'marta_v' },
        })

        const logoLink = wrapper.get('[aria-label="Ir al inicio"]')

        expect(logoLink.attributes('href')).toBe('/')
    })

    it('renders a custom subtitle when provided', () => {
        const wrapper = mount(DashboardHeader, {
            global: { plugins: [router] },
            props: { playerAlias: 'marta_v', subtitle: 'Terminal de administración' },
        })

        expect(wrapper.text()).toContain('Terminal de administración')
    })
})
