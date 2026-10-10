import { describe, it, expect, vi } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
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
    it('reveals the recaptcha widget on the first submit click, without submitting yet', async () => {
        const wrapper = mount(ContactForm)
        expect(wrapper.find('#contact-recaptcha').exists()).toBe(false)

        await wrapper.find('form').trigger('submit.prevent')
        await flushPromises()

        expect(wrapper.find('#contact-recaptcha').exists()).toBe(true)
        expect(renderWidget).toHaveBeenCalledWith(wrapper.find('#contact-recaptcha').element)
        expect(wrapper.emitted('submit')).toBeUndefined()
    })

    it('emits the recaptcha token on the second submit click', async () => {
        getToken.mockReturnValue('mocked-token')
        const wrapper = mount(ContactForm)

        await wrapper.find('form').trigger('submit.prevent')
        await flushPromises()
        await wrapper.find('form').trigger('submit.prevent')

        expect(wrapper.emitted('submit')[0]).toEqual([{ recaptchaToken: 'mocked-token' }])
    })
})
