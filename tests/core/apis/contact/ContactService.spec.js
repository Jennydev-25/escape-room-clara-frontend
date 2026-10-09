import ContactRepository from "@/core/apis/contact/ContactRepository";
import ContactService from "@/core/apis/contact/ContactService";
import { describe, expect, test } from "vitest";

describe('Integration - Contact Service', () => {

    test('send should throw \'¡Ups! Algo salió mal\' when the uri is invalid', async () => {
        const repository = new ContactRepository()
        repository.uri = ''
        const service = new ContactService(repository)

        await expect(service.send({
            name: 'Test',
            email: 'test@test.com',
            type: 'QUESTION',
            message: 'Mensaje de prueba',
            recaptchaToken: 'token'
        })).rejects.toThrow('¡Ups! Algo salió mal')
    })

})
