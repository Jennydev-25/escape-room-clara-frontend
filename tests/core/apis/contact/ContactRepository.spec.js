import ContactRepository from "@/core/apis/contact/ContactRepository";
import { describe, expect, test } from "vitest";

describe('Integration - Contact Repository', () => {

    test('send should throw \'¡Ups! Algo salió mal\' when the uri is invalid', async () => {
        const repository = new ContactRepository()
        repository.uri = ''

        await expect(repository.send({
            name: 'Test',
            email: 'test@test.com',
            type: 'QUESTION',
            message: 'Mensaje de prueba',
            recaptchaToken: 'token'
        })).rejects.toThrow('¡Ups! Algo salió mal')
    })

})
