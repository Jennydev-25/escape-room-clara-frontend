import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import LoginForm from '@/components/auth/LoginForm.vue'

describe('LoginForm', () => {
    it('shows the email and password fields and the submit button', () => {
        const wrapper = mount(LoginForm)

        expect(wrapper.find('#login-email').exists()).toBe(true)
        expect(wrapper.find('#login-password').exists()).toBe(true)
        expect(wrapper.get('button[type="submit"]').text()).toBe('Iniciar sesión')
    })

    it('updates the email and password models when the player types', async () => {
        const wrapper = mount(LoginForm, {
            props: {
                email: '',
                password: '',
                'onUpdate:email': (value) => wrapper.setProps({ email: value }),
                'onUpdate:password': (value) => wrapper.setProps({ password: value }),
            },
        })

        await wrapper.get('#login-email').setValue('marta@correo.com')
        await wrapper.get('#login-password').setValue('secreta123')

        expect(wrapper.props('email')).toBe('marta@correo.com')
        expect(wrapper.props('password')).toBe('secreta123')
    })

    it('emits submit when the form is sent', async () => {
        const wrapper = mount(LoginForm)

        await wrapper.get('form').trigger('submit')

        expect(wrapper.emitted('submit')).toHaveLength(1)
    })
})
