import TrashRepository from "@/core/apis/trash/TrashRepository";
import { describe, expect, test } from "vitest";

describe('Integration - Trash Repository', () => {

    test('listDiscardedFiles should throw \'¡Ups! Algo salió mal\' when the uri is invalid', async () => {
        const repository = new TrashRepository()
        repository.uri = ''

        await expect(repository.listDiscardedFiles()).rejects.toThrow('¡Ups! Algo salió mal')
    })

})
