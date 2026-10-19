import { seenMapper } from "@/core/mappers/seen/seen-mapper";
import SeenModel from "@/core/models/seen/SeenModel";
import { describe, expect, test } from "vitest";

describe('SeenModel', () => {

    test('SeenModel should expose its data', () => {
        const seenModel = new SeenModel(
            'folder:leeme',
            '2026-10-15T18:30:00'
        )

        expect(seenModel.getKey()).toEqual('folder:leeme')
        expect(seenModel.getSeenAt()).toEqual('2026-10-15T18:30:00')
    })

    test('create should build a SeenModel from a dto using a mapper', () => {
        const dto = {
            key: 'folder:leeme',
            seenAt: '2026-10-15T18:30:00'
        }

        const seenModel = SeenModel.create(dto, seenMapper)

        expect(seenModel.getKey()).toEqual('folder:leeme')
        expect(seenModel.getSeenAt()).toEqual('2026-10-15T18:30:00')
    })

})
