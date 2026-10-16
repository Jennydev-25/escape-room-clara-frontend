import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AccountCredentialsCard from '@/shared/dashboard/AccountCredentialsCard.vue'

describe('AccountCredentialsCard', () => {
    it('leaves the full name and the alias empty for the player to fill', async () => {
        const wrapper = mount(AccountCredentialsCard)

        await wrapper.get('button').trigger('click')

        expect(wrapper.get('#credentials-full-name').element.value).toBe('')
        expect(wrapper.get('#credentials-alias').element.value).toBe('')
    })

    it('does not offer to change the email', async () => {
        const wrapper = mount(AccountCredentialsCard)

        await wrapper.get('button').trigger('click')

        expect(wrapper.find('#credentials-email').exists()).toBe(false)
        expect(wrapper.text()).not.toContain('Correo electrónico')
    })

    it('hides the credential fields until "Editar mis datos" is clicked', () => {
        const wrapper = mount(AccountCredentialsCard)

        expect(wrapper.find('#credentials-full-name').exists()).toBe(false)
        expect(wrapper.get('button').text()).toContain('Editar mis datos')
    })

    it('shows a close button once editing is active', async () => {
        const wrapper = mount(AccountCredentialsCard)

        await wrapper.get('button').trigger('click')

        expect(wrapper.get('[aria-label="Cerrar"]').exists()).toBe(true)
    })

    it('returns to the collapsed state when the close button is clicked', async () => {
        const wrapper = mount(AccountCredentialsCard)

        await wrapper.get('button').trigger('click')
        await wrapper.get('[aria-label="Cerrar"]').trigger('click')

        expect(wrapper.find('#credentials-full-name').exists()).toBe(false)
        expect(wrapper.get('button').text()).toContain('Editar mis datos')
    })

    it.each([
        ['fullName', '#credentials-full-name', 'Clara Rey'],
        ['alias', '#credentials-alias', 'jugador_01'],
    ])('emits update:%s when the field is typed', async (model, selector, value) => {
        const wrapper = mount(AccountCredentialsCard)

        await wrapper.get('button').trigger('click')
        await wrapper.get(selector).setValue(value)

        expect(wrapper.emitted(`update:${model}`)[0]).toEqual([value])
    })

    it('emits submit when the form is sent', async () => {
        const wrapper = mount(AccountCredentialsCard)

        await wrapper.get('button').trigger('click')
        await wrapper.get('form').trigger('submit.prevent')

        expect(wrapper.emitted('submit')).toHaveLength(1)
    })

    it('returns to the collapsed state when the form is sent', async () => {
        const wrapper = mount(AccountCredentialsCard)

        await wrapper.get('button').trigger('click')
        await wrapper.get('form').trigger('submit.prevent')

        expect(wrapper.find('#credentials-full-name').exists()).toBe(false)
        expect(wrapper.get('button').text()).toContain('Editar mis datos')
    })

    it.each([
        ['currentPassword', '#credentials-current-password', 'actual_123'],
        ['newPassword', '#credentials-new-password', 'nueva_1234'],
        ['confirmPassword', '#credentials-confirm-password', 'nueva_1234'],
    ])('emits update:%s when the password field is typed', async (model, selector, value) => {
        const wrapper = mount(AccountCredentialsCard)

        await wrapper.get('button').trigger('click')
        await wrapper.get(selector).setValue(value)

        expect(wrapper.emitted(`update:${model}`)[0]).toEqual([value])
    })

    it('emits submit-password and returns to the collapsed state when the password form is sent', async () => {
        const wrapper = mount(AccountCredentialsCard)

        await wrapper.get('button').trigger('click')
        await wrapper.get('.account-credentials-card__password-section').trigger('submit.prevent')

        expect(wrapper.emitted('submit-password')).toHaveLength(1)
        expect(wrapper.find('#credentials-current-password').exists()).toBe(false)
        expect(wrapper.get('button').text()).toContain('Editar mis datos')
    })
})
