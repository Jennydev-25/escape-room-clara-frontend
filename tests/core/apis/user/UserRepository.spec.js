import UserRepository from "@/core/apis/user/UserRepository";
import { describe, expect, test } from "vitest";

describe('Integration - User Repository', () => {

    test('getProfile should throw \'¡Ups! Algo salió mal\' when the uri is invalid', async () => {
        const repository = new UserRepository()
        repository.uri = ''

        await expect(repository.getProfile()).rejects.toThrow('¡Ups! Algo salió mal')
    })

    test('completeProfile should throw \'¡Ups! Algo salió mal\' when the uri is invalid', async () => {
        const repository = new UserRepository()
        repository.uri = ''

        await expect(repository.completeProfile({ fullName: 'Clara Vega', alias: 'clara' })).rejects.toThrow('¡Ups! Algo salió mal')
    })

})
