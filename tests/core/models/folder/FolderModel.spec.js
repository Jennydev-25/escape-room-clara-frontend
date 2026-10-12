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

})
