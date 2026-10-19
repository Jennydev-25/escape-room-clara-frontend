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

    it('shows the avatar of the player next to the alias', () => {
        const wrapper = mount(DashboardHeader, {
            global: { plugins: [router] },
            props: { playerAlias: 'marta_v', avatarId: 3 },
        })

        const image = wrapper.get('.dashboard-header__avatar img')

        expect(image.attributes('alt')).toBe('Avatar 3')
        expect(image.classes()).toContain('scale-130')
    })

    it('shows the user icon when the player has no avatar yet', () => {
        const wrapper = mount(DashboardHeader, {
            global: { plugins: [router] },
            props: { playerAlias: 'marta_v' },
        })

        expect(wrapper.find('.dashboard-header__avatar img').exists()).toBe(false)
        expect(wrapper.find('.dashboard-header__avatar svg').exists()).toBe(true)
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
