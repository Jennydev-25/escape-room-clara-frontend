import ProgressRepository from "@/core/apis/progress/ProgressRepository";
import { describe, expect, test } from "vitest";

describe('Integration - Progress Repository', () => {

    test('getProgress should throw \'¡Ups! Algo salió mal\' when the uri is invalid', async () => {
        const repository = new ProgressRepository()
        repository.uri = ''

        await expect(repository.getProgress()).rejects.toThrow('¡Ups! Algo salió mal')
    })

})
