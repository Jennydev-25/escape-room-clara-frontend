import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AccountCredentialsCard from '@/shared/AccountCredentialsCard.vue'

describe('AccountCredentialsCard', () => {
    it('renders the current account values in the fields', () => {
        const wrapper = mount(AccountCredentialsCard, {
            props: {
                fullName: 'Marta Vega',
                alias: 'marta_v',
                email: 'marta@example.com',
            },
        })

        expect(wrapper.get('#credentials-full-name').element.value).toBe('Marta Vega')
        expect(wrapper.get('#credentials-alias').element.value).toBe('marta_v')
        expect(wrapper.get('#credentials-email').element.value).toBe('marta@example.com')
    })
})
