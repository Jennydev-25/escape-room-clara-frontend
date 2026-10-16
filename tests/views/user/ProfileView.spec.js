import { describe, it, expect, vi } from 'vitest'
import { flushPromises, mount } from '@vue/test-utils'
import { createPinia } from 'pinia'
import router from '@/router'
import { useAuthStore } from '@/stores/auth'
import ProfileView from '@/views/user/ProfileView.vue'
import InvestigatorCredentialCard from '@/shared/dashboard/InvestigatorCredentialCard.vue'
import AccountCredentialsCard from '@/shared/dashboard/AccountCredentialsCard.vue'

// servicio de usuario falso que devuelve el perfil indicado (por defecto, un jugador sin nombre completo)
const userServiceOf = ({ alias = 'jugador_01', fullName = '', email = 'jugador@correo.com', avatarId = null, updateProfile = vi.fn().mockResolvedValue({}) } = {}) => ({
    getProfile: vi.fn().mockResolvedValue({ getAlias: () => alias, getFullName: () => fullName, getEmail: () => email, getAvatarId: () => avatarId }),
    updateProfile,
})

// monta el perfil con los servicios que se le indiquen
const mountProfile = (services = {}) => mount(ProfileView, {
    global: {
        plugins: [router, createPinia()],
        provide: {
            AuthService: { logout: vi.fn() },
            UserService: userServiceOf(),
            ...services,
        },
    },
})

describe('ProfileView', () => {
    it('renders the profile page title', () => {
        const wrapper = mountProfile()

        expect(wrapper.text()).toContain('Mi perfil')
    })

    it('marks "Mi perfil" as the active section in the sidebar', async () => {
        useAuthStore().setSession('jwt-token', 'refresh-token')
        await router.push('/perfil')

        const wrapper = mountProfile()

        const activeLink = wrapper.find('[aria-current="page"]')
        expect(activeLink.text()).toBe('Mi perfil')
    })

    it('renders the profile subtitle', () => {
        const wrapper = mountProfile()

        expect(wrapper.text()).toContain('Registro oficial de tu credencial de investigador y los datos de tu cuenta.')
    })

    it('shows the real alias of the player in the credential card', async () => {
        const wrapper = mountProfile({ UserService: userServiceOf({ alias: 'marta_v' }) })
        await flushPromises()

        expect(wrapper.findComponent(InvestigatorCredentialCard).props('alias')).toBe('marta_v')
    })

    it('shows the real full name of the player in the credential card', async () => {
        const wrapper = mountProfile({ UserService: userServiceOf({ fullName: 'Marta Vega' }) })
        await flushPromises()

        expect(wrapper.findComponent(InvestigatorCredentialCard).props('fullName')).toBe('Marta Vega')
    })

    it('leaves the account credentials card empty for the player to fill', async () => {
        const wrapper = mountProfile({ UserService: userServiceOf({ alias: 'marta_v' }) })
        await flushPromises()

        expect(wrapper.findComponent(AccountCredentialsCard).props('alias')).toBe('')
    })

    it('shows the real alias of the player in the header', async () => {
        const wrapper = mountProfile({ UserService: userServiceOf({ alias: 'marta_v' }) })
        await flushPromises()

        expect(wrapper.get('.dashboard-header__alias').text()).toBe('marta_v')
    })

    it('shows the avatar the player has saved in the credential card', async () => {
        const wrapper = mountProfile({ UserService: userServiceOf({ avatarId: 3 }) })
        await flushPromises()

        expect(wrapper.findComponent(InvestigatorCredentialCard).props('avatarId')).toBe(3)
    })

    it('saves the new avatar with the data of the player when the picker emits one', async () => {
        const userService = userServiceOf({ alias: 'marta_v', email: 'marta@correo.com', avatarId: 3 })
        const wrapper = mountProfile({ UserService: userService })
        await flushPromises()

        await wrapper.findComponent(InvestigatorCredentialCard).vm.$emit('update:avatar-id', 5)
        await flushPromises()

        expect(userService.updateProfile).toHaveBeenCalledWith({
            alias: 'marta_v',
            email: 'marta@correo.com',
            emailConfirmation: 'marta@correo.com',
            avatarId: 5,
        })
        expect(wrapper.findComponent(InvestigatorCredentialCard).props('avatarId')).toBe(5)
    })

    it('keeps the previous avatar when the new one cannot be saved', async () => {
        const userService = userServiceOf({ avatarId: 3, updateProfile: vi.fn().mockRejectedValue(new Error('network')) })
        const wrapper = mountProfile({ UserService: userService })
        await flushPromises()

        await wrapper.findComponent(InvestigatorCredentialCard).vm.$emit('update:avatar-id', 5)
        await flushPromises()

        expect(wrapper.findComponent(InvestigatorCredentialCard).props('avatarId')).toBe(3)
    })
})
