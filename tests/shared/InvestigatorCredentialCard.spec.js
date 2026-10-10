import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import InvestigatorCredentialCard from '@/shared/InvestigatorCredentialCard.vue'

describe('InvestigatorCredentialCard', () => {
    it('renders the player alias', () => {
        const wrapper = mount(InvestigatorCredentialCard, {
            props: { alias: 'marta_v' },
        })
        expect(wrapper.text()).toContain('marta_v')
    })
})
