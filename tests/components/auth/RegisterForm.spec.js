import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import RegisterForm from '@/components/auth/RegisterForm.vue'

const renderWidget = vi.fn().mockResolvedValue(1)

vi.mock('@/composables/useRecaptcha', () => ({
    useRecaptcha: () => ({
        renderWidget,
        getToken: vi.fn(),
        reset: vi.fn(),
    }),
}))

describe('RegisterForm', () => {
    it('hides the confirm password field until the password field is focused', async () => {
        const wrapper = mount(RegisterForm)
        expect(wrapper.find('#register-confirm-password').exists()).toBe(false)

        await wrapper.find('#register-password').trigger('focus')

        expect(wrapper.find('#register-confirm-password').exists()).toBe(true)
    })

    it('renders the recaptcha widget into its own container on mount', () => {
        const wrapper = mount(RegisterForm)

        expect(renderWidget).toHaveBeenCalledWith(wrapper.find('#register-recaptcha').element)
    })
})
