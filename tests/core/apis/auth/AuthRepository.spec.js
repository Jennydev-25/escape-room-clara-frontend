import AuthRepository from "@/core/apis/auth/AuthRepository";
import { describe, expect, test } from "vitest";

describe('Integration - Auth Repository', () => {

    test('register should throw \'Algo paso\' when the uri is invalid', async () => {
        const repository = new AuthRepository()
        repository.uri = ''

        await expect(repository.register({
            email: 'test@test.com',
            password: 'Test1234',
            confirmPassword: 'Test1234',
            recaptchaToken: 'token'
        })).rejects.toThrow('Algo paso')
    })

})
