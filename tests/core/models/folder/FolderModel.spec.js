import { folderMapper } from "@/core/mappers/folder/folder-mapper";
import FolderModel from "@/core/models/folder/FolderModel";
import PuzzleSummaryModel from "@/core/models/puzzle/PuzzleSummaryModel";
import { describe, expect, test } from "vitest";

describe('FolderModel', () => {

    test('FolderModel should expose its data', () => {
        const puzzle = new PuzzleSummaryModel(2, 'Capítulo 2: Tomás Elorza', 'CIPHER', 1)
        const folderModel = new FolderModel('tomas', 'Tomás', [puzzle])

        expect(folderModel.getCode()).toEqual('tomas')
        expect(folderModel.getName()).toEqual('Tomás')
        expect(folderModel.getPuzzles()).toEqual([puzzle])
    })

    test('create should build a FolderModel from a dto using a mapper', () => {
        const dto = {
            code: 'tomas',
            name: 'Tomás',
            puzzles: [
                { id: 2, title: 'Capítulo 2: Tomás Elorza', type: 'CIPHER', displayOrder: 1 }
            ]
        }

        const folderModel = FolderModel.create(dto, folderMapper)

        expect(folderModel.getCode()).toEqual('tomas')
        expect(folderModel.getName()).toEqual('Tomás')
        expect(folderModel.getPuzzles()).toHaveLength(1)
        expect(folderModel.getPuzzles()[0]).toBeInstanceOf(PuzzleSummaryModel)
        expect(folderModel.getPuzzles()[0].getTitle()).toEqual('Capítulo 2: Tomás Elorza')
    })

})
