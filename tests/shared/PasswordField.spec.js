import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import PasswordField from '@/shared/PasswordField.vue'

describe('PasswordField', () => {
    it('renders the input with type password by default', () => {
        const wrapper = mount(PasswordField)
        expect(wrapper.find('input').attributes('type')).toBe('password')
    })
})
