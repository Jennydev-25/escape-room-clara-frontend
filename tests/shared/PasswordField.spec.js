import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { Eye, EyeOff } from '@lucide/vue'
import PasswordField from '@/shared/PasswordField.vue'

describe('PasswordField', () => {
    it('renders the input with type password by default, with the eye closed', () => {
        const wrapper = mount(PasswordField)
        expect(wrapper.find('input').attributes('type')).toBe('password')
        expect(wrapper.findComponent(EyeOff).exists()).toBe(true)
    })

    it('shows the password as text with the eye open when the toggle button is clicked', async () => {
        const wrapper = mount(PasswordField)
        await wrapper.find('button').trigger('click')
        expect(wrapper.find('input').attributes('type')).toBe('text')
        expect(wrapper.findComponent(Eye).exists()).toBe(true)
    })
})
