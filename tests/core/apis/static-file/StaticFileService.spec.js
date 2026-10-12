import StaticFileRepository from "@/core/apis/static-file/StaticFileRepository";
import StaticFileService from "@/core/apis/static-file/StaticFileService";
import { useAuthStore } from "@/stores/auth";
import { createPinia, setActivePinia } from "pinia";
import { afterEach, describe, expect, test, vi } from "vitest";

describe('Integration - StaticFile Service', () => {

    afterEach(() => {
        vi.unstubAllGlobals()
        delete URL.createObjectURL
    })

    test('getFileUrl should download the file and return an object url to show it', async () => {
        setActivePinia(createPinia())
        useAuthStore().setSession('jwt-token', 'refresh-token')
        const blob = new Blob(['file content'])
        const fetchMock = vi.fn().mockResolvedValue({
            ok: true,
            blob: () => Promise.resolve(blob),
        })
        vi.stubGlobal('fetch', fetchMock)
        URL.createObjectURL = vi.fn().mockReturnValue('blob:http://localhost:5173/libreta')
        const service = new StaticFileService(new StaticFileRepository())

        const fileUrl = await service.getFileUrl('/tomas/libreta_tomas.png')

        expect(fetchMock.mock.calls[0][0]).toContain('/tomas/libreta_tomas.png')
        expect(URL.createObjectURL).toHaveBeenCalledWith(blob)
        expect(fileUrl).toBe('blob:http://localhost:5173/libreta')
    })

})

describe('Unit - StaticFile Service', () => {

    afterEach(() => {
        delete URL.createObjectURL
    })

    test('getFileUrl should turn the blob from the repository into an object url', async () => {
        const blob = new Blob(['file content'])
        const repository = { getFile: vi.fn().mockResolvedValue(blob) }
        URL.createObjectURL = vi.fn().mockReturnValue('blob:http://localhost:5173/factura')
        const service = new StaticFileService(repository)

        const fileUrl = await service.getFileUrl('/fraude/factura_3812.png')

        expect(repository.getFile).toHaveBeenCalledWith('/fraude/factura_3812.png')
        expect(URL.createObjectURL).toHaveBeenCalledWith(blob)
        expect(fileUrl).toBe('blob:http://localhost:5173/factura')
    })

})
