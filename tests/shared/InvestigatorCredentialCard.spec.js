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

    it('renders the assigned case and investigation status', () => {
        const wrapper = mount(InvestigatorCredentialCard, {
            props: {
                alias: 'marta_v',
                caseName: 'El último archivo de Clara',
                status: 'Investigación en curso',
            },
        })
        expect(wrapper.text()).toContain('El último archivo de Clara')
        expect(wrapper.text()).toContain('Investigación en curso')
    })
})
