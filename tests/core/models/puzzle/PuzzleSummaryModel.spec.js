import { puzzleSummaryMapper } from "@/core/mappers/puzzle/puzzle-summary-mapper";
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

    test('create should build a PuzzleSummaryModel from a dto using a mapper', () => {
        const dto = {
            id: 2,
            title: 'Capítulo 2: Tomás Elorza',
            type: 'CIPHER',
            displayOrder: 1
        }

        const puzzleSummaryModel = PuzzleSummaryModel.create(dto, puzzleSummaryMapper)

        expect(puzzleSummaryModel.getId()).toEqual(2)
        expect(puzzleSummaryModel.getTitle()).toEqual('Capítulo 2: Tomás Elorza')
        expect(puzzleSummaryModel.getType()).toEqual('CIPHER')
        expect(puzzleSummaryModel.getDisplayOrder()).toEqual(1)
    })

})
