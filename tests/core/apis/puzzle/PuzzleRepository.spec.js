import PuzzleRepository from "@/core/apis/puzzle/PuzzleRepository";
import { describe, expect, test } from "vitest";

describe('Integration - Puzzle Repository', () => {

    test('getPuzzle should throw \'¡Ups! Algo salió mal\' when the uri is invalid', async () => {
        const repository = new PuzzleRepository()
        repository.uri = ''

        await expect(repository.getPuzzle(2)).rejects.toThrow('¡Ups! Algo salió mal')
    })

    test('getHint should throw \'¡Ups! Algo salió mal\' when the uri is invalid', async () => {
        const repository = new PuzzleRepository()
        repository.uri = ''

        await expect(repository.getHint(2, 1)).rejects.toThrow('¡Ups! Algo salió mal')
    })

})
