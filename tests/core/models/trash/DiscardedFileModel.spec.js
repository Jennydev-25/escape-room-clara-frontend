import DiscardedFileModel from "@/core/models/trash/DiscardedFileModel";
import { describe, expect, test } from "vitest";

describe('DiscardedFileModel', () => {

    test('DiscardedFileModel should expose its data', () => {
        const discardedFileModel = new DiscardedFileModel(
            1,
            'borrador_reportaje_puerto_v1.txt',
            'TEXT',
            '/papelera/borrador_reportaje_puerto_v1.txt'
        )

        expect(discardedFileModel.getId()).toEqual(1)
        expect(discardedFileModel.getName()).toEqual('borrador_reportaje_puerto_v1.txt')
        expect(discardedFileModel.getType()).toEqual('TEXT')
        expect(discardedFileModel.getBody()).toEqual('/papelera/borrador_reportaje_puerto_v1.txt')
    })

})
