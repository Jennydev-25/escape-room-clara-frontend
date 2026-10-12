import UserRepository from "@/core/apis/user/UserRepository";
import UserService from "@/core/apis/user/UserService";
import { createPinia, setActivePinia } from "pinia";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";

describe('Integration - User Service', () => {

    beforeEach(() => {
        setActivePinia(createPinia())
    })

    afterEach(() => {
        vi.unstubAllGlobals()
    })

    test('getProfile should return the profile as UserProfileModel from the backend response', async () => {
        const fetchMock = vi.fn().mockResolvedValue({
            ok: true,
            json: () => Promise.resolve({ alias: 'clara', email: 'clara.vega@example.com', avatarId: 3, fullName: 'Clara Vega' })
        })
        vi.stubGlobal('fetch', fetchMock)
        const service = new UserService(new UserRepository())

        const profile = await service.getProfile()

        expect(fetchMock.mock.calls[0][0]).toContain('/users/me')
        expect(profile.getAlias()).toBe('clara')
        expect(profile.getEmail()).toBe('clara.vega@example.com')
        expect(profile.getAvatarId()).toBe(3)
        expect(profile.getFullName()).toBe('Clara Vega')
    })

    test('getProfile should throw \'¡Ups! Algo salió mal\' when the backend responds with an error status', async () => {
        vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false }))
        const service = new UserService(new UserRepository())

        await expect(service.getProfile()).rejects.toThrow('¡Ups! Algo salió mal')
    })

})

describe('Unit - User Service', () => {

    test('getProfile should map the repository response to a UserProfileModel', async () => {
        const repository = new UserRepository()
        const service = new UserService(repository)
        vi.spyOn(repository, 'getProfile').mockResolvedValue({ alias: 'clara', email: 'clara.vega@example.com', avatarId: 3, fullName: 'Clara Vega' })

        const profile = await service.getProfile()

        expect(profile.getAlias()).toBe('clara')
        expect(profile.getEmail()).toBe('clara.vega@example.com')
        expect(profile.getAvatarId()).toBe(3)
        expect(profile.getFullName()).toBe('Clara Vega')
    })

})
