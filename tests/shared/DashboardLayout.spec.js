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
})
