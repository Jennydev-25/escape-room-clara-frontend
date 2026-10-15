import SeenRepository from "@/core/apis/seen/SeenRepository";
import SeenService from "@/core/apis/seen/SeenService";
import { describe, expect, test } from "vitest";

describe('Integration - Seen Service', () => {

    test('listSeen should throw \'¡Ups! Algo salió mal\' when the uri is invalid', async () => {
        const repository = new SeenRepository()
        repository.uri = ''
        const service = new SeenService(repository)

        await expect(service.listSeen()).rejects.toThrow('¡Ups! Algo salió mal')
    })

})
