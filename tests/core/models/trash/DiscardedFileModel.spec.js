import { discardedFileMapper } from "@/core/mappers/trash/discarded-file-mapper";
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

    test('create should build a DiscardedFileModel from a dto using a mapper', () => {
        const dto = {
            id: 1,
            name: 'borrador_reportaje_puerto_v1.txt',
            type: 'TEXT',
            body: '/papelera/borrador_reportaje_puerto_v1.txt'
        }

        const discardedFileModel = DiscardedFileModel.create(dto, discardedFileMapper)

        expect(discardedFileModel.getId()).toEqual(1)
        expect(discardedFileModel.getName()).toEqual('borrador_reportaje_puerto_v1.txt')
        expect(discardedFileModel.getType()).toEqual('TEXT')
        expect(discardedFileModel.getBody()).toEqual('/papelera/borrador_reportaje_puerto_v1.txt')
    })

})
