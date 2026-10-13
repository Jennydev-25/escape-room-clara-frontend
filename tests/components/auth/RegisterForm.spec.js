import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import RegisterForm from '@/components/auth/RegisterForm.vue'

const renderWidget = vi.fn().mockResolvedValue(1)
const getToken = vi.fn()

vi.mock('@/composables/useRecaptcha', () => ({
    useRecaptcha: () => ({
        renderWidget,
        getToken,
        reset: vi.fn(),
    }),
}))

describe('RegisterForm', () => {
    beforeEach(() => {
        renderWidget.mockClear()
        getToken.mockClear()
    })

    it('hides the confirm password field until the password field is focused', async () => {
        const wrapper = mount(RegisterForm)
        expect(wrapper.find('#register-confirm-password').exists()).toBe(false)

        await wrapper.find('#register-password').trigger('focus')

        expect(wrapper.find('#register-confirm-password').exists()).toBe(true)
    })

    it('renders the recaptcha widget together with the confirm password field', async () => {
        const wrapper = mount(RegisterForm)
        expect(renderWidget).not.toHaveBeenCalled()

        await wrapper.find('#register-password').trigger('focus')

        expect(renderWidget).toHaveBeenCalledWith(wrapper.find('#register-recaptcha').element)
    })

    it('emits the recaptcha token on submit', async () => {
        getToken.mockReturnValue('mocked-token')
        const wrapper = mount(RegisterForm)
        await wrapper.find('#register-password').trigger('focus')
        await flushPromises()

        await wrapper.find('form').trigger('submit.prevent')

        expect(wrapper.emitted('submit')[0]).toEqual([{ recaptchaToken: 'mocked-token' }])
    })
})
