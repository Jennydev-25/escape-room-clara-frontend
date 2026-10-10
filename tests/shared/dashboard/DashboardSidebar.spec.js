import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import DashboardSidebar from '@/shared/dashboard/DashboardSidebar.vue'

describe('DashboardSidebar', () => {
    it.each([
        ['inicio', 'Resumen'],
        ['perfil', 'Mi perfil'],
    ])('marks the "%s" section link as the current page via aria-current', (activeSection, linkText) => {
        const wrapper = mount(DashboardSidebar, {
            props: { activeSection },
        })

        const activeLink = wrapper.findAll('a').find((link) => link.text() === linkText)

        expect(activeLink.attributes('aria-current')).toBe('page')
    })
})
