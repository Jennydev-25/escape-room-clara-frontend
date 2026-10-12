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

})
