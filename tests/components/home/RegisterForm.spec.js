import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import RegisterForm from '@/components/home/RegisterForm.vue'

describe('RegisterForm', () => {
    it('hides the confirm password field until the password field is focused', async () => {
        const wrapper = mount(RegisterForm)
        expect(wrapper.find('#register-confirm-password').exists()).toBe(false)

        await wrapper.find('#register-password').trigger('focus')

        expect(wrapper.find('#register-confirm-password').exists()).toBe(true)
    })
})
