import AuthRepository from "@/core/apis/auth/AuthRepository";
import { describe, expect, test } from "vitest";

describe('Integration - Auth Repository', () => {

    test('register should throw \'¡Ups! Algo salió mal\' when the uri is invalid', async () => {
        const repository = new AuthRepository()
        repository.uri = ''

        await expect(repository.register({
            email: 'test@test.com',
            password: 'Test1234',
            confirmPassword: 'Test1234',
            recaptchaToken: 'token'
        })).rejects.toThrow('¡Ups! Algo salió mal')
    })


    test('register should throw \'¡Ups! Algo salió mal\' when the backend rejects an empty recaptcha token', async () => {
        const repository = new AuthRepository()

        await expect(repository.register({
            email: `test-${Date.now()}@test.com`,
            password: 'Test1234',
            confirmPassword: 'Test1234',
            recaptchaToken: ''
        })).rejects.toThrow('¡Ups! Algo salió mal')
    })

})
