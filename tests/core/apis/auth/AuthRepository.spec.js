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

})
