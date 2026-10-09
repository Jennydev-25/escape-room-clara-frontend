import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import AccessPanel from '@/components/home/AccessPanel.vue'
import RegisterForm from '@/components/auth/RegisterForm.vue'

const register = vi.fn().mockResolvedValue({ getMessage: () => 'User stored successfully' })

vi.mock('@/core/apis/auth/AuthService', () => ({
    default: class {
        register = register
    },
}))

vi.mock('@/composables/useRecaptcha', () => ({
    useRecaptcha: () => ({
        renderWidget: vi.fn().mockResolvedValue(1),
        getToken: vi.fn(),
        reset: vi.fn(),
    }),
}))

describe('AccessPanel', () => {
    it('registers the user with the form data and the recaptcha token on register submit', async () => {
        const wrapper = mount(AccessPanel, {
            props: { open: true, tab: 'register' },
        })

        await wrapper.find('#register-email').setValue('test@test.com')
        await wrapper.find('#register-password').setValue('Test1234')
        await wrapper.find('#register-password').trigger('focus')
        await wrapper.find('#register-confirm-password').setValue('Test1234')

        await wrapper.findComponent(RegisterForm).vm.$emit('submit', { recaptchaToken: 'mocked-token' })

        expect(register).toHaveBeenCalledWith({
            email: 'test@test.com',
            password: 'Test1234',
            confirmPassword: 'Test1234',
            recaptchaToken: 'mocked-token',
        })
    })
})
