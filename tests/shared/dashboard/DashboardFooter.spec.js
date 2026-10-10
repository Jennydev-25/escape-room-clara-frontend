import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import DashboardFooter from '@/shared/dashboard/DashboardFooter.vue'

describe('DashboardFooter', () => {
    it('renders the copyright notice', () => {
        const wrapper = mount(DashboardFooter)

        expect(wrapper.text()).toContain('© 2026 Todos los derechos reservados')
    })
})
