import { describe, it, expect } from 'vitest'
import { useAuthStore } from '@/stores/auth'
import router from '@/router'

describe('router', () => {
    it('redirects to the home when a visitor without a session opens /perfil', async () => {
        await router.push('/')
        await router.push('/perfil')

        expect(router.currentRoute.value.name).toBe('home')
    })

    it('lets a visitor without a session open the home', async () => {
        await router.push('/')

        expect(router.currentRoute.value.name).toBe('home')
    })

    it('resolves the /perfil route to the ProfileView component', async () => {
        useAuthStore().setSession('jwt-token', 'refresh-token')
        await router.push('/')
        await router.push('/perfil')
        await router.isReady()

        expect(router.currentRoute.value.name).toBe('profile')
    })

    it('resolves the /resumen route to the ResumenView component', async () => {
        useAuthStore().setSession('jwt-token', 'refresh-token')
        await router.push('/')
        await router.push('/resumen')
        await router.isReady()

        expect(router.currentRoute.value.name).toBe('summary')
    })

    it('redirects to the home when a visitor without a session opens /escritorio', async () => {
        await router.push('/')
        await router.push('/escritorio')

        expect(router.currentRoute.value.name).toBe('home')
    })

    it('resolves the /escritorio route to the GameView component', async () => {
        useAuthStore().setSession('jwt-token', 'refresh-token')
        await router.push('/')
        await router.push('/escritorio')
        await router.isReady()

        expect(router.currentRoute.value.name).toBe('game')
    })
})
