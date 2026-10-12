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

})
