import ProgressRepository from "@/core/apis/progress/ProgressRepository";
import { describe, expect, test } from "vitest";

describe('Integration - Progress Repository', () => {

    test('getProgress should throw \'¡Ups! Algo salió mal\' when the uri is invalid', async () => {
        const repository = new ProgressRepository()
        repository.uri = ''

        await expect(repository.getProgress()).rejects.toThrow('¡Ups! Algo salió mal')
    })

    test('accumulateTime should throw \'¡Ups! Algo salió mal\' when the uri is invalid', async () => {
        const repository = new ProgressRepository()
        repository.uri = ''

        await expect(repository.accumulateTime({ secondsToAdd: 30 })).rejects.toThrow('¡Ups! Algo salió mal')
    })

    test('updateNote should throw \'¡Ups! Algo salió mal\' when the uri is invalid', async () => {
        const repository = new ProgressRepository()
        repository.uri = ''

        await expect(repository.updateNote({ freeNote: 'Mi nota' })).rejects.toThrow('¡Ups! Algo salió mal')
    })

})
