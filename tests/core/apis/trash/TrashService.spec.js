import TrashRepository from "@/core/apis/trash/TrashRepository";
import TrashService from "@/core/apis/trash/TrashService";
import { createPinia, setActivePinia } from "pinia";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";

describe('Integration - Trash Service', () => {

    beforeEach(() => {
        setActivePinia(createPinia())
    })

    afterEach(() => {
        vi.unstubAllGlobals()
    })

    test('listDiscardedFiles should return the files as DiscardedFileModel from the backend response', async () => {
        const fetchMock = vi.fn().mockResolvedValue({
            ok: true,
            json: () => Promise.resolve([
                { id: 1, name: 'borrador_reportaje_puerto_v1.txt', type: 'TEXT', body: '/papelera/borrador_reportaje_puerto_v1.txt' },
                { id: 5, name: 'salgo_fatal.png', type: 'IMG', body: '/papelera/salgo_fatal.png' }
            ])
        })
        vi.stubGlobal('fetch', fetchMock)
        const service = new TrashService(new TrashRepository())

        const files = await service.listDiscardedFiles()

        expect(fetchMock.mock.calls[0][0]).toContain('/trash')
        expect(files).toHaveLength(2)
        expect(files[0].getName()).toBe('borrador_reportaje_puerto_v1.txt')
        expect(files[1].getType()).toBe('IMG')
    })

    test('listDiscardedFiles should throw \'¡Ups! Algo salió mal\' when the backend responds with an error status', async () => {
        vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false }))
        const service = new TrashService(new TrashRepository())

        await expect(service.listDiscardedFiles()).rejects.toThrow('¡Ups! Algo salió mal')
    })

})

describe('Unit - Trash Service', () => {

    test('listDiscardedFiles should map the repository response to a list of DiscardedFileModel', async () => {
        const repository = new TrashRepository()
        const service = new TrashService(repository)
        vi.spyOn(repository, 'listDiscardedFiles').mockResolvedValue([
            { id: 1, name: 'borrador_reportaje_puerto_v1.txt', type: 'TEXT', body: '/papelera/borrador_reportaje_puerto_v1.txt' },
            { id: 5, name: 'salgo_fatal.png', type: 'IMG', body: '/papelera/salgo_fatal.png' }
        ])

        const files = await service.listDiscardedFiles()

        expect(files).toHaveLength(2)
        expect(files[0].getBody()).toBe('/papelera/borrador_reportaje_puerto_v1.txt')
        expect(files[1].getName()).toBe('salgo_fatal.png')
    })

})
