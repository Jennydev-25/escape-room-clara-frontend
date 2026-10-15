import SeenRepository from "@/core/apis/seen/SeenRepository";
import SeenService from "@/core/apis/seen/SeenService";
import { describe, expect, test } from "vitest";

describe('Integration - Seen Service', () => {

    test('listSeen should throw \'¡Ups! Algo salió mal\' when the uri is invalid', async () => {
        const repository = new SeenRepository()
        repository.uri = ''
        const service = new SeenService(repository)

        await expect(service.listSeen()).rejects.toThrow('¡Ups! Algo salió mal')
    })

})

describe('Unit - Seen Service', () => {

    test('listSeen should map the backend response to a list of SeenModel', async () => {
        const fakeRepository = {
            listSeen: () => Promise.resolve([
                { key: 'folder:leeme', seenAt: '2026-10-15T18:30:00' },
                { key: 'file:/tomas/tomas_elorza.png', seenAt: '2026-10-15T18:31:00' }
            ])
        }
        const service = new SeenService(fakeRepository)

        const seen = await service.listSeen()

        expect(seen).toHaveLength(2)
        expect(seen[0].getKey()).toBe('folder:leeme')
        expect(seen[1].getKey()).toBe('file:/tomas/tomas_elorza.png')
    })

})
