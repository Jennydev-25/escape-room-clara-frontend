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

    it('shows the full name as the title and the alias below it', () => {
        const wrapper = mount(InvestigatorCredentialCard, {
            props: { fullName: 'Marta Vega', alias: 'marta_v' },
        })
        expect(wrapper.get('.investigator-credential-card__name').text()).toBe('Marta Vega')
        expect(wrapper.text()).toContain('Alias: marta_v')
    })

    it('shows the alias as the title, without repeating it, when the player has no full name yet', () => {
        const wrapper = mount(InvestigatorCredentialCard, {
            props: { alias: 'marta_v' },
        })
        expect(wrapper.get('.investigator-credential-card__name').text()).toBe('marta_v')
        expect(wrapper.text()).not.toContain('Alias:')
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

    it('zooms the avatar image so the transparent margin of the picture is cropped', () => {
        const wrapper = mount(InvestigatorCredentialCard, {
            props: { alias: 'marta_v', avatarId: 3 },
        })
        expect(wrapper.get('img[alt="Avatar 3"]').classes()).toContain('scale-130')
    })

    it('shows the avatar in a big circle', () => {
        const wrapper = mount(InvestigatorCredentialCard, {
            props: { alias: 'marta_v', avatarId: 3 },
        })
        const circle = wrapper.get('.investigator-credential-card__avatar-circle')
        expect(circle.classes()).toContain('h-28')
        expect(circle.classes()).toContain('w-28')
    })

    it('keeps the camera button outside the avatar circle', () => {
        const wrapper = mount(InvestigatorCredentialCard, {
            props: { alias: 'marta_v', avatarId: 3 },
        })
        expect(wrapper.find('.investigator-credential-card__avatar-circle').exists()).toBe(true)
        expect(wrapper.find('.investigator-credential-card__avatar-circle [aria-label="Cambiar avatar"]').exists()).toBe(false)
        expect(wrapper.find('.investigator-credential-card__avatar [aria-label="Cambiar avatar"]').exists()).toBe(true)
    })

    it('zooms the avatar options of the picker', async () => {
        const wrapper = mount(InvestigatorCredentialCard, {
            props: { alias: 'marta_v' },
        })

        await wrapper.find('[aria-label="Cambiar avatar"]').trigger('click')

        wrapper.findAll('button[aria-label^="Avatar "] img').forEach((image) => {
            expect(image.classes()).toContain('scale-130')
        })
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
