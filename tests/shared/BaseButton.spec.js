import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseButton from '@/shared/BaseButton.vue'

describe('BaseButton', () => {
    it('renders the slot content with type button by default', () => {
        const wrapper = mount(BaseButton, { slots: { default: 'Investigar' } })

        expect(wrapper.text()).toBe('Investigar')
        expect(wrapper.attributes('type')).toBe('button')
    })
})
