import { describe, it, expect, vi } from 'vitest'
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
})
