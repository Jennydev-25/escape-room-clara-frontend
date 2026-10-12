import { progressMapper } from "@/core/mappers/progress/progress-mapper";
import ProgressModel from "@/core/models/progress/ProgressModel";
import { describe, expect, test } from "vitest";

describe('ProgressModel', () => {

    test('ProgressModel should expose the progress data', () => {
        const progress = new ProgressModel(
            2,
            'AB',
            false,
            120,
            'Mi nota',
            '2026-10-12T15:00:00',
            'B'
        )

        expect(progress.getCurrentChapter()).toEqual(2)
        expect(progress.getHudLetters()).toEqual('AB')
        expect(progress.isInvestigationSubmitted()).toEqual(false)
        expect(progress.getTimeSpentSeconds()).toEqual(120)
        expect(progress.getFreeNote()).toEqual('Mi nota')
        expect(progress.getUpdatedAt()).toEqual('2026-10-12T15:00:00')
        expect(progress.getLastHudLetterAdded()).toEqual('B')
    })

    test('create should build a ProgressModel from a dto using a mapper', () => {
        const dto = {
            currentChapter: 2,
            hudLetters: 'AB',
            investigationSubmitted: false,
            timeSpentSeconds: 120,
            freeNote: 'Mi nota',
            updatedAt: '2026-10-12T15:00:00',
            lastHudLetterAdded: 'B'
        }

        const progress = ProgressModel.create(dto, progressMapper)

        expect(progress.getCurrentChapter()).toEqual(2)
        expect(progress.getHudLetters()).toEqual('AB')
        expect(progress.isInvestigationSubmitted()).toEqual(false)
        expect(progress.getTimeSpentSeconds()).toEqual(120)
        expect(progress.getFreeNote()).toEqual('Mi nota')
        expect(progress.getUpdatedAt()).toEqual('2026-10-12T15:00:00')
        expect(progress.getLastHudLetterAdded()).toEqual('B')
    })

})
