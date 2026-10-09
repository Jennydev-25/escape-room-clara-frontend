import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import Contact from '@/components/home/Contact.vue'
import ContactForm from '@/components/home/ContactForm.vue'

const send = vi.fn().mockResolvedValue({ getMessage: () => 'Mensaje enviado correctamente' })

vi.mock('@/core/apis/contact/ContactService', () => ({
    default: class {
        send = send
    },
}))

vi.mock('@/composables/useRecaptcha', () => ({
    useRecaptcha: () => ({
        renderWidget: vi.fn().mockResolvedValue(1),
        getToken: vi.fn(),
        reset: vi.fn(),
    }),
}))

describe('Contact', () => {

    beforeEach(() => {
        send.mockClear()
        send.mockResolvedValue({ getMessage: () => 'Mensaje enviado correctamente' })
    })

    afterEach(() => {
        vi.useRealTimers()
    })

    it('sends the contact form data with the recaptcha token on submit', async () => {
        const wrapper = mount(Contact)

        await wrapper.find('.contact__cta').trigger('click')

        await wrapper.find('#contact-name').setValue('Test')
        await wrapper.find('#contact-email').setValue('test@test.com')
        await wrapper.find('#contact-type').setValue('QUESTION')
        await wrapper.find('#contact-message').setValue('Mensaje de prueba')

        await wrapper.findComponent(ContactForm).vm.$emit('submit', { recaptchaToken: 'mocked-token' })

        expect(send).toHaveBeenCalledWith({
            name: 'Test',
            email: 'test@test.com',
            type: 'QUESTION',
            message: 'Mensaje de prueba',
            recaptchaToken: 'mocked-token',
        })
    })

    it('shows an error message when the send request fails', async () => {
        send.mockRejectedValueOnce(new Error('¡Ups! Algo salió mal'))
        const wrapper = mount(Contact)
        await wrapper.find('.contact__cta').trigger('click')

        await wrapper.findComponent(ContactForm).vm.$emit('submit', { recaptchaToken: 'mocked-token' })
        await Promise.resolve()

        expect(wrapper.find('.contact__feedback').text()).toBe('¡Ups! Algo salió mal')
    })

    it('resets and closes the form 3 seconds after a successful submit', async () => {
        vi.useFakeTimers({ shouldAdvanceTime: true })
        const wrapper = mount(Contact)
        await wrapper.find('.contact__cta').trigger('click')

        await wrapper.findComponent(ContactForm).vm.$emit('submit', { recaptchaToken: 'mocked-token' })
        await Promise.resolve()
        await Promise.resolve()

        expect(wrapper.find('.contact__sent').text()).toBe('Mensaje enviado correctamente')

        await vi.advanceTimersByTimeAsync(3000)

        expect(wrapper.find('#contact-form-card').exists()).toBe(false)
    })

    it('clears the pending timers and the scroll trigger on unmount', () => {
        const wrapper = mount(Contact)

        expect(() => wrapper.unmount()).not.toThrow()
    })

})
