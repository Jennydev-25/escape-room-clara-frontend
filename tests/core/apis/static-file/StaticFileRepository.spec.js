import StaticFileRepository from "@/core/apis/static-file/StaticFileRepository";
import { useAuthStore } from "@/stores/auth";
import { createPinia, setActivePinia } from "pinia";
import { afterEach, describe, expect, test, vi } from "vitest";

describe('Integration - StaticFile Repository', () => {

    afterEach(() => {
        vi.unstubAllGlobals()
    })

    test('getFile should download the file from the server root with the Bearer token', async () => {
        setActivePinia(createPinia())
        useAuthStore().setSession('jwt-token', 'refresh-token')
        const blob = new Blob(['file content'])
        const fetchMock = vi.fn().mockResolvedValue({
            ok: true,
            blob: () => Promise.resolve(blob),
        })
        vi.stubGlobal('fetch', fetchMock)
        const repository = new StaticFileRepository()

        const data = await repository.getFile('/tomas/libreta_tomas.png')

        expect(fetchMock).toHaveBeenCalledWith(`${new URL(import.meta.env.VITE_API_URL).origin}/tomas/libreta_tomas.png`, {
            headers: { Authorization: 'Bearer jwt-token' },
        })
        expect(data).toBe(blob)
    })

})

describe('Unit - StaticFile Repository', () => {

    afterEach(() => {
        vi.restoreAllMocks()
    })

    test('getFile should ask authGetBlob for the file url built from the server origin', async () => {
        const blob = new Blob(['file content'])
        const repository = new StaticFileRepository()
        const authGetBlobSpy = vi.spyOn(repository, 'authGetBlob').mockResolvedValue(blob)

        const data = await repository.getFile('/fraude/factura_3812.png')

        expect(authGetBlobSpy).toHaveBeenCalledWith(`${new URL(import.meta.env.VITE_API_URL).origin}/fraude/factura_3812.png`)
        expect(data).toBe(blob)
    })

})
