import { describe, it, expect } from 'vitest'
import router from '@/router'

describe('router', () => {
    it('resolves the /perfil route to the ProfileView component', async () => {
        await router.push('/perfil')
        await router.isReady()

        expect(router.currentRoute.value.name).toBe('profile')
    })

    it('resolves the /resumen route to the ResumenView component', async () => {
        await router.push('/resumen')
        await router.isReady()

        expect(router.currentRoute.value.name).toBe('summary')
    })
})
