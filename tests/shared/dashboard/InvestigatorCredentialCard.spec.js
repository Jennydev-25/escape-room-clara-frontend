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

    it('renders a credential id with a 6-digit random number and the issue date', () => {
        const wrapper = mount(InvestigatorCredentialCard, {
            props: { alias: 'marta_v' },
        })
        expect(wrapper.text()).toMatch(/ID N[ºo] \d{6}\/10\/2026/)
    })

    it('shows the 9 avatar options when the camera button is clicked', async () => {
        const wrapper = mount(InvestigatorCredentialCard, {
            props: { alias: 'marta_v' },
        })

        await wrapper.find('[aria-label="Cambiar avatar"]').trigger('click')

        expect(wrapper.findAll('[aria-label^="Avatar "]')).toHaveLength(9)
    })

    it('closes the avatar picker when the close button is clicked', async () => {
        const wrapper = mount(InvestigatorCredentialCard, {
            props: { alias: 'marta_v' },
        })

        await wrapper.find('[aria-label="Cambiar avatar"]').trigger('click')
        await wrapper.find('[aria-label="Cerrar selector de avatar"]').trigger('click')

        expect(wrapper.find('[aria-label="Cerrar selector de avatar"]').exists()).toBe(false)
    })

    it('shows a save button when the avatar picker is open', async () => {
        const wrapper = mount(InvestigatorCredentialCard, {
            props: { alias: 'marta_v' },
        })

        await wrapper.find('[aria-label="Cambiar avatar"]').trigger('click')

        expect(wrapper.findAll('button').find((b) => b.text().includes('Guardar cambios'))).toBeTruthy()
    })

    it('closes the avatar picker when the save button is clicked', async () => {
        const wrapper = mount(InvestigatorCredentialCard, {
            props: { alias: 'marta_v' },
        })

        await wrapper.find('[aria-label="Cambiar avatar"]').trigger('click')
        await wrapper.findAll('button').find((b) => b.text().includes('Guardar cambios')).trigger('click')

        expect(wrapper.findAll('button').find((b) => b.text().includes('Guardar cambios'))).toBeFalsy()
    })

    it('marks the clicked avatar as selected', async () => {
        const wrapper = mount(InvestigatorCredentialCard, {
            props: { alias: 'marta_v' },
        })

        await wrapper.find('[aria-label="Cambiar avatar"]').trigger('click')
        await wrapper.find('[aria-label="Avatar 2"]').trigger('click')

        expect(wrapper.find('[aria-label="Avatar 2"]').attributes('aria-pressed')).toBe('true')
        expect(wrapper.find('[aria-label="Avatar 1"]').attributes('aria-pressed')).toBe('false')
    })

    it('emits the chosen avatar id when the save button is clicked', async () => {
        const wrapper = mount(InvestigatorCredentialCard, {
            props: { alias: 'marta_v' },
        })

        await wrapper.find('[aria-label="Cambiar avatar"]').trigger('click')
        await wrapper.find('[aria-label="Avatar 3"]').trigger('click')
        await wrapper.findAll('button').find((b) => b.text().includes('Guardar cambios')).trigger('click')

        expect(wrapper.emitted('update:avatar-id')).toEqual([[3]])
    })
})
