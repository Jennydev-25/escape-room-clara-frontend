import PuzzleRepository from "@/core/apis/puzzle/PuzzleRepository";
import PuzzleService from "@/core/apis/puzzle/PuzzleService";
import { describe, expect, test } from "vitest";

const puzzleDto = {
    id: 2,
    type: 'CIPHER',
    minChapter: 2,
    displayOrder: 1,
    files: ['/tomas/libreta_tomas.png', '/tomas/indice_criptico.png'],
    question: 'Descifra el mensaje y escribe lo que has obtenido.'
}

describe('Integration - Puzzle Service', () => {

    test('getPuzzle should throw \'¡Ups! Algo salió mal\' when the uri is invalid', async () => {
        const repository = new PuzzleRepository()
        repository.uri = ''
        const service = new PuzzleService(repository)

        await expect(service.getPuzzle(2)).rejects.toThrow('¡Ups! Algo salió mal')
    })

})

describe('Unit - Puzzle Service', () => {

    test('getPuzzle should map the backend response to a PuzzleModel on success', async () => {
        let receivedId
        const fakeRepository = {
            getPuzzle: (id) => {
                receivedId = id
                return Promise.resolve(puzzleDto)
            }
        }
        const service = new PuzzleService(fakeRepository)

        const puzzle = await service.getPuzzle(2)

        expect(receivedId).toBe(2)
        expect(puzzle.getType()).toBe('CIPHER')
        expect(puzzle.getFiles()).toEqual(['/tomas/libreta_tomas.png', '/tomas/indice_criptico.png'])
        expect(puzzle.getQuestion()).toBe('Descifra el mensaje y escribe lo que has obtenido.')
    })

})
