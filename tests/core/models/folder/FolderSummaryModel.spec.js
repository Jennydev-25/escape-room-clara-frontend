import { folderSummaryMapper } from "@/core/mappers/folder/folder-summary-mapper";
import FolderSummaryModel from "@/core/models/folder/FolderSummaryModel";
import { describe, expect, test } from "vitest";

describe('FolderSummaryModel', () => {

    test('FolderSummaryModel should expose its data', () => {
        const folderSummaryModel = new FolderSummaryModel(
            'tomas',
            'Tomás'
        )

        expect(folderSummaryModel.getCode()).toEqual('tomas')
        expect(folderSummaryModel.getName()).toEqual('Tomás')
    })

    test('create should build a FolderSummaryModel from a dto using a mapper', () => {
        const dto = {
            code: 'tomas',
            name: 'Tomás'
        }

        const folderSummaryModel = FolderSummaryModel.create(dto, folderSummaryMapper)

        expect(folderSummaryModel.getCode()).toEqual('tomas')
        expect(folderSummaryModel.getName()).toEqual('Tomás')
    })

})
