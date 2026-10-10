import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import router from '@/router'
import ProfileView from '@/views/user/ProfileView.vue'
import InvestigatorCredentialCard from '@/shared/dashboard/InvestigatorCredentialCard.vue'
import AccountCredentialsCard from '@/shared/dashboard/AccountCredentialsCard.vue'

describe('ProfileView', () => {
    it('renders the profile page title', () => {
        const wrapper = mount(ProfileView, {
            global: { plugins: [router] },
        })

        expect(wrapper.text()).toContain('Mi perfil')
    })

    it('marks "Mi perfil" as the active section in the sidebar', () => {
        const wrapper = mount(ProfileView, {
            global: { plugins: [router] },
        })

        const activeLink = wrapper.find('[aria-current="page"]')
        expect(activeLink.text()).toBe('Mi perfil')
    })

    it('renders the profile subtitle', () => {
        const wrapper = mount(ProfileView, {
            global: { plugins: [router] },
        })

        expect(wrapper.text()).toContain('Registro oficial de tu credencial de investigador y los datos de tu cuenta.')
    })

    it('renders the investigator credential card with the player alias', () => {
        const wrapper = mount(ProfileView, {
            global: { plugins: [router] },
        })

        expect(wrapper.findComponent(InvestigatorCredentialCard).props('alias')).toBe('jugador_01')
    })

    it('renders the account credentials card with the player alias', () => {
        const wrapper = mount(ProfileView, {
            global: { plugins: [router] },
        })

        expect(wrapper.findComponent(AccountCredentialsCard).props('alias')).toBe('jugador_01')
    })
})
