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
})
