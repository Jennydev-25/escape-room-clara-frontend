import EmailRepository from "@/core/apis/email/EmailRepository";
import { describe, expect, test } from "vitest";

describe('Integration - Email Repository', () => {

    test('listInbox should throw \'¡Ups! Algo salió mal\' when the uri is invalid', async () => {
        const repository = new EmailRepository()
        repository.uri = ''

        await expect(repository.listInbox()).rejects.toThrow('¡Ups! Algo salió mal')
    })

})
