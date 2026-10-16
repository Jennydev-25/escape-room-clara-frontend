import { describe, it, expect, vi } from 'vitest'
import { flushPromises, mount } from '@vue/test-utils'
import { createPinia } from 'pinia'
import router from '@/router'
import { useAuthStore } from '@/stores/auth'
import ProfileView from '@/views/user/ProfileView.vue'
import InvestigatorCredentialCard from '@/shared/dashboard/InvestigatorCredentialCard.vue'
import AccountCredentialsCard from '@/shared/dashboard/AccountCredentialsCard.vue'

// servicio de usuario falso que devuelve el perfil indicado (por defecto, un jugador sin nombre completo)
const userServiceOf = ({ alias = 'jugador_01', fullName = '', email = 'jugador@correo.com', avatarId = null, updateProfile = vi.fn().mockResolvedValue({}), completeProfile = vi.fn().mockResolvedValue({ getAlias: () => alias, getFullName: () => fullName }) } = {}) => ({
    getProfile: vi.fn().mockResolvedValue({ getAlias: () => alias, getFullName: () => fullName, getEmail: () => email, getAvatarId: () => avatarId }),
    updateProfile,
    completeProfile,
})

// monta el perfil con los servicios que se le indiquen
const mountProfile = (services = {}, config = {}) => mount(ProfileView, {
    global: {
        config,
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

    it('shows the avatar the player has saved in the header', async () => {
        const wrapper = mountProfile({ UserService: userServiceOf({ avatarId: 3 }) })
        await flushPromises()

        expect(wrapper.get('.dashboard-header__avatar img').attributes('alt')).toBe('Avatar 3')
    })

    it('changes the avatar of the header when the player saves a new one', async () => {
        const wrapper = mountProfile({ UserService: userServiceOf({ avatarId: 3 }) })
        await flushPromises()

        await wrapper.findComponent(InvestigatorCredentialCard).vm.$emit('update:avatar-id', 5)
        await flushPromises()

        expect(wrapper.get('.dashboard-header__avatar img').attributes('alt')).toBe('Avatar 5')
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

    it('saves the full name and the alias typed in the account form', async () => {
        const userService = userServiceOf()
        const wrapper = mountProfile({ UserService: userService })
        await flushPromises()
        const accountCard = wrapper.findComponent(AccountCredentialsCard)

        await accountCard.vm.$emit('update:fullName', 'Marta Vega')
        await accountCard.vm.$emit('update:alias', 'marta_v')
        await accountCard.vm.$emit('submit')
        await flushPromises()

        expect(userService.completeProfile).toHaveBeenCalledWith({ fullName: 'Marta Vega', alias: 'marta_v' })
    })

    it.each([
        ['alias', 'update:alias', 'nuevo_alias', { fullName: 'Marta Vega', alias: 'nuevo_alias' }],
        ['full name', 'update:fullName', 'Clara Rey', { fullName: 'Clara Rey', alias: 'marta_v' }],
    ])('keeps the saved value of the field the player leaves empty (only the %s typed)', async (_field, event, value, expected) => {
        const userService = userServiceOf({ alias: 'marta_v', fullName: 'Marta Vega' })
        const wrapper = mountProfile({ UserService: userService })
        await flushPromises()
        const accountCard = wrapper.findComponent(AccountCredentialsCard)

        await accountCard.vm.$emit(event, value)
        await accountCard.vm.$emit('submit')
        await flushPromises()

        expect(userService.completeProfile).toHaveBeenCalledWith(expected)
    })

    it('shows the new full name and alias in the credential card and in the header after saving', async () => {
        const completeProfile = vi.fn().mockResolvedValue({ getAlias: () => 'clara_r', getFullName: () => 'Clara Rey' })
        const wrapper = mountProfile({ UserService: userServiceOf({ alias: 'marta_v', fullName: 'Marta Vega', completeProfile }) })
        await flushPromises()
        const accountCard = wrapper.findComponent(AccountCredentialsCard)

        await accountCard.vm.$emit('update:fullName', 'Clara Rey')
        await accountCard.vm.$emit('update:alias', 'clara_r')
        await accountCard.vm.$emit('submit')
        await flushPromises()

        const credentialCard = wrapper.findComponent(InvestigatorCredentialCard)
        expect(credentialCard.props('fullName')).toBe('Clara Rey')
        expect(credentialCard.props('alias')).toBe('clara_r')
        expect(wrapper.get('.dashboard-header__alias').text()).toBe('clara_r')
    })

    it('empties the account form after saving', async () => {
        const wrapper = mountProfile()
        await flushPromises()
        const accountCard = wrapper.findComponent(AccountCredentialsCard)

        await accountCard.vm.$emit('update:fullName', 'Clara Rey')
        await accountCard.vm.$emit('update:alias', 'clara_r')
        await accountCard.vm.$emit('submit')
        await flushPromises()

        expect(accountCard.props('fullName')).toBe('')
        expect(accountCard.props('alias')).toBe('')
    })

    it('keeps the previous full name and alias when they cannot be saved', async () => {
        const errorHandler = vi.fn()
        const userService = userServiceOf({ alias: 'marta_v', fullName: 'Marta Vega', completeProfile: vi.fn().mockRejectedValue(new Error('network')) })
        const wrapper = mountProfile({ UserService: userService }, { errorHandler })
        await flushPromises()
        const accountCard = wrapper.findComponent(AccountCredentialsCard)

        await accountCard.vm.$emit('update:alias', 'clara_r')
        await accountCard.vm.$emit('submit')
        await flushPromises()

        const credentialCard = wrapper.findComponent(InvestigatorCredentialCard)
        expect(credentialCard.props('alias')).toBe('marta_v')
        expect(credentialCard.props('fullName')).toBe('Marta Vega')
        expect(errorHandler).not.toHaveBeenCalled()
    })
})
