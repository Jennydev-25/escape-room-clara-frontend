import SeenRepository from "@/core/apis/seen/SeenRepository";
import { describe, expect, test } from "vitest";

describe('Integration - Seen Repository', () => {

    test('listSeen should throw \'¡Ups! Algo salió mal\' when the uri is invalid', async () => {
        const repository = new SeenRepository()
        repository.uri = ''

        await expect(repository.listSeen()).rejects.toThrow('¡Ups! Algo salió mal')
    })

})
