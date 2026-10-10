import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseButton from '@/shared/BaseButton.vue'

describe('BaseButton', () => {
    it('renders the slot content with type button by default', () => {
        const wrapper = mount(BaseButton, { slots: { default: 'Investigar' } })

        expect(wrapper.text()).toBe('Investigar')
        expect(wrapper.attributes('type')).toBe('button')
    })

    it('renders type submit when passed', () => {
        const wrapper = mount(BaseButton, { props: { type: 'submit' } })

        expect(wrapper.attributes('type')).toBe('submit')
    })

    it('uses the larger CTA padding when size is lg', () => {
        const wrapper = mount(BaseButton, { props: { size: 'lg' } })

        expect(wrapper.classes()).toContain('px-8')
        expect(wrapper.classes()).not.toContain('px-6')
    })
})
