import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import InvestigatorCredentialCard from '@/shared/dashboard/InvestigatorCredentialCard.vue'

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

    it.each([
        [true, true],
        [false, false],
    ])('shows the avatar picker button only when showAvatarPicker is %s', (showAvatarPicker, shouldShow) => {
        const wrapper = mount(InvestigatorCredentialCard, {
            props: { alias: 'marta_v', showAvatarPicker },
        })
        expect(wrapper.find('[aria-label="Cambiar avatar"]').exists()).toBe(shouldShow)
    })

    it('renders the selected avatar image when avatarId is set', () => {
        const wrapper = mount(InvestigatorCredentialCard, {
            props: { alias: 'marta_v', avatarId: 3 },
        })
        expect(wrapper.find('img[alt="Avatar 3"]').exists()).toBe(true)
    })
})
