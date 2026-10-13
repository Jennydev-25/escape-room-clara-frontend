import { describe, it, expect, vi, beforeEach } from 'vitest'
import { flushPromises, mount } from '@vue/test-utils'
import AccessPanel from '@/components/home/AccessPanel.vue'
import CompleteProfileForm from '@/components/auth/CompleteProfileForm.vue'
import LoginForm from '@/components/auth/LoginForm.vue'
import RegisterForm from '@/components/auth/RegisterForm.vue'

const register = vi.fn().mockResolvedValue({ getMessage: () => 'User stored successfully' })
const login = vi.fn().mockResolvedValue({
    getToken: () => 'jwt-token',
    getRefreshToken: () => 'refresh-token',
})
const setSession = vi.fn()
const push = vi.fn()
const completeProfile = vi.fn().mockResolvedValue({})
const withAuthService = { global: { provide: { AuthService: { register, login }, UserService: { completeProfile } } } }

vi.mock('vue-router', () => ({
    useRouter: () => ({ push }),
}))

vi.mock('@/stores/auth', () => ({
    useAuthStore: () => ({ setSession }),
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
        push.mockClear()
        register.mockClear()
        register.mockResolvedValue({ getMessage: () => 'User stored successfully' })
        login.mockClear()
        login.mockResolvedValue({
            getToken: () => 'jwt-token',
            getRefreshToken: () => 'refresh-token',
        })
    })

    it('registers the user with the form data and the recaptcha token on register submit', async () => {
        const wrapper = mount(AccessPanel, {
            ...withAuthService,
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

    it('logs in with the register credentials after a successful register', async () => {
        const wrapper = mount(AccessPanel, {
            ...withAuthService,
            props: { open: true, tab: 'register' },
        })

        await wrapper.find('#register-email').setValue('test@test.com')
        await wrapper.find('#register-password').setValue('Test1234')
        await wrapper.find('#register-password').trigger('focus')
        await wrapper.find('#register-confirm-password').setValue('Test1234')

        await wrapper.findComponent(RegisterForm).vm.$emit('submit', { recaptchaToken: 'mocked-token' })
        await flushPromises()

        expect(login).toHaveBeenCalledWith('test@test.com', 'Test1234')
    })

    it('replaces the register form with the complete profile form after a successful register', async () => {
        const wrapper = mount(AccessPanel, {
            ...withAuthService,
            props: { open: true, tab: 'register' },
        })

        await wrapper.findComponent(RegisterForm).vm.$emit('submit', { recaptchaToken: 'mocked-token' })
        await flushPromises()

        expect(wrapper.findComponent(RegisterForm).exists()).toBe(false)
        expect(wrapper.findComponent(CompleteProfileForm).exists()).toBe(true)
    })

    it('completes the profile with the full name and the alias on submit', async () => {
        const wrapper = mount(AccessPanel, {
            ...withAuthService,
            props: { open: true, tab: 'register' },
        })
        await wrapper.findComponent(RegisterForm).vm.$emit('submit', { recaptchaToken: 'mocked-token' })
        await flushPromises()

        await wrapper.find('#complete-profile-full-name').setValue('Clara Rey')
        await wrapper.find('#complete-profile-alias').setValue('jugador_01')
        await wrapper.findComponent(CompleteProfileForm).vm.$emit('submit')

        expect(completeProfile).toHaveBeenCalledWith({ fullName: 'Clara Rey', alias: 'jugador_01' })
    })

    it('goes to the summary after completing the profile', async () => {
        const wrapper = mount(AccessPanel, {
            ...withAuthService,
            props: { open: true, tab: 'register' },
        })
        await wrapper.findComponent(RegisterForm).vm.$emit('submit', { recaptchaToken: 'mocked-token' })
        await flushPromises()

        await wrapper.findComponent(CompleteProfileForm).vm.$emit('submit')
        await flushPromises()

        expect(push).toHaveBeenCalledWith('/resumen')
    })

    it('shows an error message when the register request fails', async () => {
        register.mockRejectedValueOnce(new Error('¡Ups! Algo salió mal'))
        const wrapper = mount(AccessPanel, {
            ...withAuthService,
            props: { open: true, tab: 'register' },
        })

        await wrapper.findComponent(RegisterForm).vm.$emit('submit', { recaptchaToken: 'mocked-token' })
        await Promise.resolve()

        expect(wrapper.find('.access-panel__feedback').text()).toBe('¡Ups! Algo salió mal')
    })

    it('renders the login form by default and binds its fields', async () => {
        const wrapper = mount(AccessPanel, { ...withAuthService, props: { open: true } })

        expect(wrapper.findComponent(LoginForm).exists()).toBe(true)

        await wrapper.find('#login-email').setValue('test@test.com')
        await wrapper.find('#login-password').setValue('Test1234')

        expect(wrapper.find('#login-email').element.value).toBe('test@test.com')
        expect(wrapper.find('#login-password').element.value).toBe('Test1234')
    })

    it('logs in with the form data and closes the panel on submit', async () => {
        const wrapper = mount(AccessPanel, { ...withAuthService, props: { open: true } })

        await wrapper.find('#login-email').setValue('test@test.com')
        await wrapper.find('#login-password').setValue('Test1234')

        await wrapper.findComponent(LoginForm).vm.$emit('submit')

        expect(login).toHaveBeenCalledWith('test@test.com', 'Test1234')
        expect(setSession).toHaveBeenCalledWith('jwt-token', 'refresh-token')
        await Promise.resolve()
        expect(wrapper.emitted('update:open')[0]).toEqual([false])
    })

    it('goes to the summary after a successful login', async () => {
        const wrapper = mount(AccessPanel, { ...withAuthService, props: { open: true } })

        await wrapper.find('#login-email').setValue('test@test.com')
        await wrapper.find('#login-password').setValue('Test1234')
        await wrapper.findComponent(LoginForm).vm.$emit('submit')
        await flushPromises()

        expect(push).toHaveBeenCalledWith('/resumen')
    })

    it('shows an error message when the login request fails', async () => {
        login.mockRejectedValueOnce(new Error('¡Ups! Algo salió mal'))
        const wrapper = mount(AccessPanel, { ...withAuthService, props: { open: true } })

        await wrapper.findComponent(LoginForm).vm.$emit('submit')
        await Promise.resolve()

        expect(wrapper.find('.access-panel__feedback').text()).toBe('¡Ups! Algo salió mal')
    })

    it('switches between the login and register tabs', async () => {
        const wrapper = mount(AccessPanel, { ...withAuthService, props: { open: true } })

        await wrapper.findAll('.access-panel__tab')[1].trigger('click')
        expect(wrapper.findComponent(RegisterForm).exists()).toBe(true)

        await wrapper.findAll('.access-panel__tab')[0].trigger('click')
        expect(wrapper.findComponent(LoginForm).exists()).toBe(true)
    })

    it('emits update:open with false when the close button is clicked', async () => {
        const wrapper = mount(AccessPanel, { ...withAuthService, props: { open: true } })

        await wrapper.find('.access-panel__close').trigger('click')

        expect(wrapper.emitted('update:open')[0]).toEqual([false])
    })

})
