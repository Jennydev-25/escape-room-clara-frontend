import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import router from '@/router'
import { useAuthStore } from '@/stores/auth'
import DashboardLayout from '@/shared/dashboard/DashboardLayout.vue'

describe('DashboardLayout', () => {
    it('renders the default slot content', () => {
        const wrapper = mount(DashboardLayout, {
            global: { plugins: [router, createPinia()] },
            props: { playerAlias: 'marta_v' },
            slots: { default: '<p>contenido de prueba</p>' },
        })

        expect(wrapper.find('p').text()).toBe('contenido de prueba')
    })

    it('renders the classified status next to the open session label', () => {
        const wrapper = mount(DashboardLayout, {
            global: { plugins: [router, createPinia()] },
            props: { playerAlias: 'marta_v' },
        })

        const statusBar = wrapper.find('.dashboard-layout__status')

        expect(statusBar.text()).toContain('Sesión abierta')
        expect(statusBar.text()).toContain('Estado: clasificada')
    })

    it('logs out and redirects to home when the sidebar logout button is clicked', async () => {
        const pinia = createPinia()
        setActivePinia(pinia)
        const authStore = useAuthStore()
        authStore.setSession('jwt-token', 'refresh-token')

        await router.push('/perfil')
        const pushSpy = vi.spyOn(router, 'push')

        const wrapper = mount(DashboardLayout, {
            global: { plugins: [router, pinia] },
            props: { playerAlias: 'marta_v' },
        })

        await wrapper.find('.dashboard-sidebar button').trigger('click')

        expect(authStore.token).toBeNull()
        expect(pushSpy).toHaveBeenCalledWith('/')

        pushSpy.mockRestore()
    })
})
