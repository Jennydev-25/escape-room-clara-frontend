import BaseRepository from "@/core/apis/base/BaseRepository";
import { describe, expect, test, vi, afterEach } from "vitest";
import { createPinia, setActivePinia } from "pinia";
import { useAuthStore } from "@/stores/auth";

describe('BaseRepository', () => {

    afterEach(() => {
        vi.unstubAllGlobals()
        vi.restoreAllMocks()
        localStorage.clear()
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

    test('authGet should send the stored token as a Bearer header and return the response data', async () => {
        setActivePinia(createPinia())
        useAuthStore().setSession('jwt-token', 'refresh-token')
        const fetchMock = vi.fn().mockResolvedValue({
            ok: true,
            json: () => Promise.resolve({ message: 'ok' }),
        })
        vi.stubGlobal('fetch', fetchMock)
        const repository = new BaseRepository('http://localhost:8080/api/v1')

        const data = await repository.authGet('/progress')

        expect(fetchMock).toHaveBeenCalledWith('http://localhost:8080/api/v1/progress', {
            headers: { Authorization: 'Bearer jwt-token' },
        })
        expect(data).toEqual({ message: 'ok' })
    })

    test('authGet should throw \'¡Ups! Algo salió mal\' when the backend responds with an error status', async () => {
        setActivePinia(createPinia())
        vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false }))
        const repository = new BaseRepository('http://localhost:8080/api/v1')

        await expect(repository.authGet('/progress')).rejects.toThrow('¡Ups! Algo salió mal')
    })

    test('authPost should send the body as JSON with the Bearer token and return the response data', async () => {
        setActivePinia(createPinia())
        useAuthStore().setSession('jwt-token', 'refresh-token')
        const fetchMock = vi.fn().mockResolvedValue({
            ok: true,
            json: () => Promise.resolve({ message: 'ok' }),
        })
        vi.stubGlobal('fetch', fetchMock)
        const repository = new BaseRepository('http://localhost:8080/api/v1')

        const data = await repository.authPost('/puzzles/1/answer', { answer: 'ABC' })

        expect(fetchMock).toHaveBeenCalledWith('http://localhost:8080/api/v1/puzzles/1/answer', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Authorization: 'Bearer jwt-token' },
            body: JSON.stringify({ answer: 'ABC' }),
        })
        expect(data).toEqual({ message: 'ok' })
    })

    test('authPost should throw \'¡Ups! Algo salió mal\' when the backend responds with an error status', async () => {
        setActivePinia(createPinia())
        vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false }))
        const repository = new BaseRepository('http://localhost:8080/api/v1')

        await expect(repository.authPost('/puzzles/1/answer', {})).rejects.toThrow('¡Ups! Algo salió mal')
    })

    test('authPut should send the body as JSON with the Bearer token and return the response data', async () => {
        setActivePinia(createPinia())
        useAuthStore().setSession('jwt-token', 'refresh-token')
        const fetchMock = vi.fn().mockResolvedValue({
            ok: true,
            json: () => Promise.resolve({ message: 'ok' }),
        })
        vi.stubGlobal('fetch', fetchMock)
        const repository = new BaseRepository('http://localhost:8080/api/v1')

        const data = await repository.authPut('/users/me', { alias: 'clara' })

        expect(fetchMock).toHaveBeenCalledWith('http://localhost:8080/api/v1/users/me', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', Authorization: 'Bearer jwt-token' },
            body: JSON.stringify({ alias: 'clara' }),
        })
        expect(data).toEqual({ message: 'ok' })
    })

})
