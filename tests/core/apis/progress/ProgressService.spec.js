import ProgressRepository from "@/core/apis/progress/ProgressRepository";
import ProgressService from "@/core/apis/progress/ProgressService";
import { describe, expect, test } from "vitest";

const progressDto = {
    currentChapter: 2,
    hudLetters: 'AB',
    investigationSubmitted: false,
    timeSpentSeconds: 120,
    freeNote: 'Mi nota',
    updatedAt: '2026-10-12T15:00:00',
    lastHudLetterAdded: 'B'
}

describe('Integration - Progress Service', () => {

    test('getProgress should throw \'¡Ups! Algo salió mal\' when the uri is invalid', async () => {
        const repository = new ProgressRepository()
        repository.uri = ''
        const service = new ProgressService(repository)

        await expect(service.getProgress()).rejects.toThrow('¡Ups! Algo salió mal')
    })

    test('accumulateTime should throw \'¡Ups! Algo salió mal\' when the uri is invalid', async () => {
        const repository = new ProgressRepository()
        repository.uri = ''
        const service = new ProgressService(repository)

        await expect(service.accumulateTime({ secondsToAdd: 30 })).rejects.toThrow('¡Ups! Algo salió mal')
    })

    test('updateNote should throw \'¡Ups! Algo salió mal\' when the uri is invalid', async () => {
        const repository = new ProgressRepository()
        repository.uri = ''
        const service = new ProgressService(repository)

        await expect(service.updateNote({ freeNote: 'Mi nota' })).rejects.toThrow('¡Ups! Algo salió mal')
    })

})

describe('Unit - Progress Service', () => {

    test('getProgress should map the backend response to a ProgressModel on success', async () => {
        const fakeRepository = {
            getProgress: () => Promise.resolve(progressDto)
        }
        const service = new ProgressService(fakeRepository)

        const progress = await service.getProgress()

        expect(progress.getCurrentChapter()).toBe(2)
        expect(progress.getHudLetters()).toBe('AB')
        expect(progress.getTimeSpentSeconds()).toBe(120)
    })

    test('accumulateTime should send the time data and map the response to a ProgressModel', async () => {
        let receivedData
        const fakeRepository = {
            accumulateTime: (timeData) => {
                receivedData = timeData
                return Promise.resolve({ ...progressDto, timeSpentSeconds: 150 })
            }
        }
        const service = new ProgressService(fakeRepository)

        const progress = await service.accumulateTime({ secondsToAdd: 30 })

        expect(receivedData).toEqual({ secondsToAdd: 30 })
        expect(progress.getTimeSpentSeconds()).toBe(150)
    })

    test('updateNote should send the note data and map the response to a ProgressModel', async () => {
        let receivedData
        const fakeRepository = {
            updateNote: (noteData) => {
                receivedData = noteData
                return Promise.resolve({ ...progressDto, freeNote: 'Nueva nota' })
            }
        }
        const service = new ProgressService(fakeRepository)

        const progress = await service.updateNote({ freeNote: 'Nueva nota' })

        expect(receivedData).toEqual({ freeNote: 'Nueva nota' })
        expect(progress.getFreeNote()).toBe('Nueva nota')
    })

})
