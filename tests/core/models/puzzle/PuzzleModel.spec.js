import PuzzleModel from "@/core/models/puzzle/PuzzleModel";
import { describe, expect, test } from "vitest";

describe('PuzzleModel', () => {

    test('PuzzleModel should expose its data', () => {
        const puzzleModel = new PuzzleModel(
            2,
            'CIPHER',
            2,
            1,
            ['/tomas/libreta_tomas.png', '/tomas/indice_criptico.png'],
            'Descifra el mensaje y escribe lo que has obtenido.'
        )

        expect(puzzleModel.getId()).toEqual(2)
        expect(puzzleModel.getType()).toEqual('CIPHER')
        expect(puzzleModel.getMinChapter()).toEqual(2)
        expect(puzzleModel.getDisplayOrder()).toEqual(1)
        expect(puzzleModel.getFiles()).toEqual(['/tomas/libreta_tomas.png', '/tomas/indice_criptico.png'])
        expect(puzzleModel.getQuestion()).toEqual('Descifra el mensaje y escribe lo que has obtenido.')
    })

})
