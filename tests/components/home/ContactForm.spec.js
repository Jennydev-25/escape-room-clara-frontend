import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import ContactForm from '@/components/home/ContactForm.vue'

const renderWidget = vi.fn().mockResolvedValue(1)
const getToken = vi.fn()

vi.mock('@/composables/useRecaptcha', () => ({
    useRecaptcha: () => ({
        renderWidget,
        getToken,
        reset: vi.fn(),
    }),
}))

describe('ContactForm', () => {
    it('renders the recaptcha widget into its own container on mount', () => {
        const wrapper = mount(ContactForm)

        expect(renderWidget).toHaveBeenCalledWith(wrapper.find('#contact-recaptcha').element)
    })
})
