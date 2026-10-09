import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import AccessPanel from '@/components/home/AccessPanel.vue'
import LoginForm from '@/components/auth/LoginForm.vue'
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

    beforeEach(() => {
        register.mockClear()
        register.mockResolvedValue({ getMessage: () => 'User stored successfully' })
    })

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

    it('shows an error message when the register request fails', async () => {
        register.mockRejectedValueOnce(new Error('¡Ups! Algo salió mal'))
        const wrapper = mount(AccessPanel, {
            props: { open: true, tab: 'register' },
        })

        await wrapper.findComponent(RegisterForm).vm.$emit('submit', { recaptchaToken: 'mocked-token' })
        await Promise.resolve()

        expect(wrapper.find('.access-panel__feedback').text()).toBe('¡Ups! Algo salió mal')
    })

    it('renders the login form by default and binds its fields', async () => {
        const wrapper = mount(AccessPanel, { props: { open: true } })

        expect(wrapper.findComponent(LoginForm).exists()).toBe(true)

        await wrapper.find('#login-email').setValue('test@test.com')
        await wrapper.find('#login-password').setValue('Test1234')

        expect(wrapper.find('#login-email').element.value).toBe('test@test.com')
        expect(wrapper.find('#login-password').element.value).toBe('Test1234')
    })

    it('switches between the login and register tabs', async () => {
        const wrapper = mount(AccessPanel, { props: { open: true } })

        await wrapper.findAll('.access-panel__tab')[1].trigger('click')
        expect(wrapper.findComponent(RegisterForm).exists()).toBe(true)

        await wrapper.findAll('.access-panel__tab')[0].trigger('click')
        expect(wrapper.findComponent(LoginForm).exists()).toBe(true)
    })

    it('emits update:open with false when the close button is clicked', async () => {
        const wrapper = mount(AccessPanel, { props: { open: true } })

        await wrapper.find('.access-panel__close').trigger('click')

        expect(wrapper.emitted('update:open')[0]).toEqual([false])
    })

})
