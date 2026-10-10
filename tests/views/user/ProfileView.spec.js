import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import router from '@/router'
import ProfileView from '@/views/user/ProfileView.vue'

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
})
