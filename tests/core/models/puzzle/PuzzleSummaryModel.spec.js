import PuzzleSummaryModel from "@/core/models/puzzle/PuzzleSummaryModel";
import { describe, expect, test } from "vitest";

describe('PuzzleSummaryModel', () => {

    test('PuzzleSummaryModel should expose its data', () => {
        const puzzleSummaryModel = new PuzzleSummaryModel(
            2,
            'Capítulo 2: Tomás Elorza',
            'CIPHER',
            1
        )

        expect(puzzleSummaryModel.getId()).toEqual(2)
        expect(puzzleSummaryModel.getTitle()).toEqual('Capítulo 2: Tomás Elorza')
        expect(puzzleSummaryModel.getType()).toEqual('CIPHER')
        expect(puzzleSummaryModel.getDisplayOrder()).toEqual(1)
    })

})
