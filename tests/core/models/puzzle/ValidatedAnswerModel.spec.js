import { validatedAnswerMapper } from "@/core/mappers/puzzle/validated-answer-mapper";
import ValidatedAnswerModel from "@/core/models/puzzle/ValidatedAnswerModel";
import { describe, expect, test } from "vitest";

describe('ValidatedAnswerModel', () => {

    test('ValidatedAnswerModel should expose its data', () => {
        const validatedAnswerModel = new ValidatedAnswerModel(
            true,
            true,
            'M',
            ['fraude']
        )

        expect(validatedAnswerModel.isCorrect()).toEqual(true)
        expect(validatedAnswerModel.getUpdatesChapter()).toEqual(true)
        expect(validatedAnswerModel.getNewHudLetter()).toEqual('M')
        expect(validatedAnswerModel.getUnlocks()).toEqual(['fraude'])
    })

    test('create should build a ValidatedAnswerModel from a dto using a mapper', () => {
        const dto = {
            correct: true,
            updatesChapter: true,
            newHudLetter: 'M',
            unlocks: ['fraude']
        }

        const validatedAnswerModel = ValidatedAnswerModel.create(dto, validatedAnswerMapper)

        expect(validatedAnswerModel.isCorrect()).toEqual(true)
        expect(validatedAnswerModel.getUpdatesChapter()).toEqual(true)
        expect(validatedAnswerModel.getNewHudLetter()).toEqual('M')
        expect(validatedAnswerModel.getUnlocks()).toEqual(['fraude'])
    })

})
