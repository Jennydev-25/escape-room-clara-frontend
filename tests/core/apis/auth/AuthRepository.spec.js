import AuthRepository from "@/core/apis/auth/AuthRepository";
import { describe, expect, test, vi } from "vitest";

describe('Integration - Auth Repository', () => {

    test('should throw \'¡Ups! Algo salió mal\' when the uri is invalid', async () => {
        const repository = new AuthRepository()
        repository.uri = ''

        await expect(repository.register({
            email: 'test@test.com',
            password: 'Test1234',
            confirmPassword: 'Test1234',
            recaptchaToken: 'token'
        })).rejects.toThrow('¡Ups! Algo salió mal')
    })


    test('should throw \'¡Ups! Algo salió mal\' when the backend rejects an empty recaptcha token', async () => {
        const repository = new AuthRepository()

        await expect(repository.register({
            email: `test-${Date.now()}@test.com`,
            password: 'Test1234',
            confirmPassword: 'Test1234',
            recaptchaToken: ''
        })).rejects.toThrow('¡Ups! Algo salió mal')
    })

    test('login should throw \'¡Ups! Algo salió mal\' when the uri is invalid', async () => {
        const repository = new AuthRepository()
        repository.uri = ''

        await expect(repository.login('test@test.com', 'Test1234')).rejects.toThrow('¡Ups! Algo salió mal')
    })

    test('login should throw \'¡Ups! Algo salió mal\' when the credentials are wrong', async () => {
        const repository = new AuthRepository()

        await expect(repository.login('wrong@test.com', 'WrongPass1')).rejects.toThrow('¡Ups! Algo salió mal')
    })

    test('login should return the response data when the credentials are correct', async () => {
        vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
            ok: true,
            json: () => Promise.resolve({ token: 'jwt-token', refreshToken: 'refresh-token' }),
        }))
        const repository = new AuthRepository()

        const data = await repository.login('test@test.com', 'Test1234')

        expect(data).toEqual({ token: 'jwt-token', refreshToken: 'refresh-token' })
        vi.unstubAllGlobals()
    })

})
