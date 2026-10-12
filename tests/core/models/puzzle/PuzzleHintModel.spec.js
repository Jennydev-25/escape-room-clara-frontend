import PuzzleHintModel from "@/core/models/puzzle/PuzzleHintModel";
import { describe, expect, test } from "vitest";

describe('PuzzleHintModel', () => {

    test('PuzzleHintModel should expose its data', () => {
        const puzzleHintModel = new PuzzleHintModel(
            1,
            'Fíjate en el orden de las letras del índice.'
        )

        expect(puzzleHintModel.getNumber()).toEqual(1)
        expect(puzzleHintModel.getText()).toEqual('Fíjate en el orden de las letras del índice.')
    })

})
