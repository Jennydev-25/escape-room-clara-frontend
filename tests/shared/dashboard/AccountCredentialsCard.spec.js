import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AccountCredentialsCard from '@/shared/dashboard/AccountCredentialsCard.vue'

describe('AccountCredentialsCard', () => {
    it('renders the current account values in the fields', async () => {
        const wrapper = mount(AccountCredentialsCard, {
            props: {
                fullName: 'Marta Vega',
                alias: 'marta_v',
                email: 'marta@example.com',
            },
        })

        await wrapper.get('button').trigger('click')

        expect(wrapper.get('#credentials-full-name').element.value).toBe('Marta Vega')
        expect(wrapper.get('#credentials-alias').element.value).toBe('marta_v')
        expect(wrapper.get('#credentials-email').element.value).toBe('marta@example.com')
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
})
