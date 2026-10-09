import BaseRepository from "@/core/apis/base/BaseRepository";
import { describe, expect, test, vi, afterEach } from "vitest";

describe('BaseRepository', () => {

    afterEach(() => {
        vi.unstubAllGlobals()
        vi.restoreAllMocks()
    })

    test('get should throw \'¡Ups! Algo salió mal\' when the uri is invalid', async () => {
        const repository = new BaseRepository('')

        await expect(repository.get()).rejects.toThrow('¡Ups! Algo salió mal')
    })

    test('get should throw \'¡Ups! Algo salió mal\' when the backend responds with an error status', async () => {
        vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false }))
        const repository = new BaseRepository('http://localhost:8080/api/v1')

        await expect(repository.get()).rejects.toThrow('¡Ups! Algo salió mal')
    })

    test('get should return the response data when the backend responds with success', async () => {
        vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
            ok: true,
            json: () => Promise.resolve({ message: 'ok' }),
        }))
        const repository = new BaseRepository('http://localhost:8080/api/v1')

        const data = await repository.get()

        expect(data).toEqual({ message: 'ok' })
    })

    test('getAxios should throw \'¡Ups! Algo salió mal\' when the uri is invalid', async () => {
        const repository = new BaseRepository('')

        await expect(repository.getAxios()).rejects.toThrow('¡Ups! Algo salió mal')
    })

    test('getAxios should return the response data when the backend responds with success', async () => {
        const axios = (await import('axios')).default
        vi.spyOn(axios, 'get').mockResolvedValue({ data: { message: 'ok' } })
        const repository = new BaseRepository('http://localhost:8080/api/v1')

        const data = await repository.getAxios()

        expect(data).toEqual({ message: 'ok' })
    })

    test('getUri should return the uri passed to the constructor', () => {
        const repository = new BaseRepository('http://localhost:8080/api/v1')

        expect(repository.getUri()).toBe('http://localhost:8080/api/v1')
    })

    test('post should return the response data when the backend responds with success', async () => {
        vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
            ok: true,
            json: () => Promise.resolve({ message: 'ok' }),
        }))
        const repository = new BaseRepository('http://localhost:8080/api/v1')

        const data = await repository.post('/test', {})

        expect(data).toEqual({ message: 'ok' })
    })

})
