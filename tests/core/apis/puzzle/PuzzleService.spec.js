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

    test('getHint should throw \'¡Ups! Algo salió mal\' when the uri is invalid', async () => {
        const repository = new PuzzleRepository()
        repository.uri = ''
        const service = new PuzzleService(repository)

        await expect(service.getHint(2, 1)).rejects.toThrow('¡Ups! Algo salió mal')
    })

    test('validateAnswer should throw \'¡Ups! Algo salió mal\' when the uri is invalid', async () => {
        const repository = new PuzzleRepository()
        repository.uri = ''
        const service = new PuzzleService(repository)

        await expect(service.validateAnswer(2, { value: 'CLARA' })).rejects.toThrow('¡Ups! Algo salió mal')
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

    test('getHint should ask for the hint number and map the response to a PuzzleHintModel', async () => {
        let receivedArgs
        const fakeRepository = {
            getHint: (id, number) => {
                receivedArgs = [id, number]
                return Promise.resolve({ number: 1, text: 'Fíjate en el orden de las letras del índice.' })
            }
        }
        const service = new PuzzleService(fakeRepository)

        const hint = await service.getHint(2, 1)

        expect(receivedArgs).toEqual([2, 1])
        expect(hint.getNumber()).toBe(1)
        expect(hint.getText()).toBe('Fíjate en el orden de las letras del índice.')
    })

    test('validateAnswer should send the answer data and map the response to a ValidatedAnswerModel', async () => {
        let receivedArgs
        const fakeRepository = {
            validateAnswer: (id, answerData) => {
                receivedArgs = [id, answerData]
                return Promise.resolve({ correct: true, updatesChapter: true, newHudLetter: 'M', unlocks: ['fraude'] })
            }
        }
        const service = new PuzzleService(fakeRepository)

        const result = await service.validateAnswer(2, { value: 'CLARA' })

        expect(receivedArgs).toEqual([2, { value: 'CLARA' }])
        expect(result.isCorrect()).toBe(true)
        expect(result.getNewHudLetter()).toBe('M')
        expect(result.getUnlocks()).toEqual(['fraude'])
    })

})
