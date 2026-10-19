import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { ref } from 'vue'
import NavBar from '@/components/home/NavBar.vue'

const activeId = ref(null)

vi.mock('@/composables/home/useScrollSpy', () => ({
    useScrollSpy: () => ({ activeId }),
}))

describe('NavBar', () => {
    it('marks "Inicio" as active when no section is active yet', () => {
        activeId.value = null
        const wrapper = mount(NavBar)

        const inicioLink = wrapper.findAll('.navbar__link').find((link) => link.text() === 'Inicio')

        expect(inicioLink.classes()).toContain('text-primary')
    })

    it('marks the link of the section that is active', () => {
        activeId.value = 'el-caso'
        const wrapper = mount(NavBar)

        const links = wrapper.findAll('.navbar__link')
        const elCaso = links.find((link) => link.text() === 'El caso')
        const inicio = links.find((link) => link.text() === 'Inicio')

        expect(elCaso.classes()).toContain('text-primary')
        expect(inicio.classes()).not.toContain('text-primary')
    })

    it('keeps the mobile menu closed until the toggle is clicked', () => {
        activeId.value = null
        const wrapper = mount(NavBar)

        expect(wrapper.find('#navbar-mobile-menu').exists()).toBe(false)
        expect(wrapper.get('.navbar__toggle').attributes('aria-label')).toBe('Abrir menú')
        expect(wrapper.get('.navbar__toggle').attributes('aria-expanded')).toBe('false')
    })

    it('opens the mobile menu with all the links when the toggle is clicked', async () => {
        activeId.value = null
        const wrapper = mount(NavBar)

        await wrapper.get('.navbar__toggle').trigger('click')

        expect(wrapper.get('#navbar-mobile-menu').exists()).toBe(true)
        expect(wrapper.findAll('.navbar__mobile-link').map((link) => link.text())).toEqual([
            'Inicio',
            'El caso',
            'Sobre el juego',
            'Contacto',
        ])
        expect(wrapper.get('.navbar__toggle').attributes('aria-label')).toBe('Cerrar menú')
        expect(wrapper.get('.navbar__toggle').attributes('aria-expanded')).toBe('true')
    })

    it('closes the mobile menu when the toggle is clicked again', async () => {
        activeId.value = null
        const wrapper = mount(NavBar)
        await wrapper.get('.navbar__toggle').trigger('click')

        await wrapper.get('.navbar__toggle').trigger('click')

        expect(wrapper.find('#navbar-mobile-menu').exists()).toBe(false)
    })

    it('closes the mobile menu when a link is chosen', async () => {
        activeId.value = null
        const wrapper = mount(NavBar)
        await wrapper.get('.navbar__toggle').trigger('click')

        await wrapper.findAll('.navbar__mobile-link')[1].trigger('click')

        expect(wrapper.find('#navbar-mobile-menu').exists()).toBe(false)
    })

    it('highlights the active section in the mobile menu', async () => {
        activeId.value = 'contacto'
        const wrapper = mount(NavBar)
        await wrapper.get('.navbar__toggle').trigger('click')

        const contacto = wrapper.findAll('.navbar__mobile-link').find((link) => link.text() === 'Contacto')

        expect(contacto.classes()).toContain('text-primary')
    })
})
