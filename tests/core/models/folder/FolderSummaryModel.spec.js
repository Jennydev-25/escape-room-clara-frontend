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

})
