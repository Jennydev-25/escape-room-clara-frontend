import AuthRepository from "@/core/apis/auth/AuthRepository";
import AuthService from "@/core/apis/auth/AuthService";
import { describe, expect, test } from "vitest";

describe('Integration - Auth Service', () => {

    test('register should throw \'¡Ups! Algo salió mal\' when the uri is invalid', async () => {
        const repository = new AuthRepository()
        repository.uri = ''
        const service = new AuthService(repository)

        await expect(service.register({
            email: 'test@test.com',
            password: 'Test1234',
            confirmPassword: 'Test1234',
            recaptchaToken: 'token'
        })).rejects.toThrow('¡Ups! Algo salió mal')
    })

})

describe('Unit - Auth Service', () => {

    test('register should map the backend response to a RegisterModel on success', async () => {
        const fakeRepository = {
            register: () => Promise.resolve({ message: 'User stored successfully' })
        }
        const service = new AuthService(fakeRepository)

        const register = await service.register({
            email: 'test@test.com',
            password: 'Test1234',
            confirmPassword: 'Test1234',
            recaptchaToken: 'token'
        })

        expect(register.getMessage()).toBe('User stored successfully')
    })

})
