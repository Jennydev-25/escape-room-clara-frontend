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
            global: { plugins: [router] },
        })

        const button = wrapper.findAll('button').find((b) => b.text().includes('Cerrar sesión'))

        expect(button.text()).toBe('Cerrar sesión')
    })

    it('renders a mobile menu toggle, closed by default', () => {
        const wrapper = mount(DashboardSidebar, {
            global: { plugins: [router] },
        })

        const toggle = wrapper.find('[aria-label="Abrir menú"]')

        expect(toggle.exists()).toBe(true)
        expect(toggle.attributes('aria-expanded')).toBe('false')
    })

    it('opens the mobile menu when the toggle is clicked', async () => {
        const wrapper = mount(DashboardSidebar, {
            global: { plugins: [router] },
        })

        await wrapper.find('[aria-label="Abrir menú"]').trigger('click')

        expect(wrapper.find('[aria-label="Cerrar menú"]').attributes('aria-expanded')).toBe('true')
    })

    it.each([
        ['/resumen', 'Resumen'],
        ['/perfil', 'Mi perfil'],
    ])('marks the link to %s as the current page via aria-current', async (path, linkText) => {
        await router.push(path)

        const wrapper = mount(DashboardSidebar, {
            global: { plugins: [router] },
        })

        const activeLink = wrapper.findAll('a').find((a) => a.text() === linkText)

        expect(activeLink.attributes('aria-current')).toBe('page')
    })

    it('closes the mobile menu when a mobile nav link is clicked', async () => {
        const wrapper = mount(DashboardSidebar, {
            global: { plugins: [router] },
        })

        await wrapper.find('[aria-label="Abrir menú"]').trigger('click')
        await wrapper.find('#dashboard-sidebar-menu a').trigger('click')

        expect(wrapper.find('[aria-label="Abrir menú"]').exists()).toBe(true)
    })

    it('emits logout and closes the mobile menu when the mobile logout button is clicked', async () => {
        const wrapper = mount(DashboardSidebar, {
            global: { plugins: [router] },
        })

        await wrapper.find('[aria-label="Abrir menú"]').trigger('click')
        await wrapper.find('#dashboard-sidebar-menu button').trigger('click')

        expect(wrapper.emitted('logout')).toBeTruthy()
        expect(wrapper.find('[aria-label="Abrir menú"]').exists()).toBe(true)
    })
})
