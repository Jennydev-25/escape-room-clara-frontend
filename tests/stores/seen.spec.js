import { createPinia, setActivePinia } from "pinia";
import { useSeenStore } from "@/stores/seen";
import { describe, expect, test, beforeEach } from "vitest";

describe('useSeenStore', () => {

    beforeEach(() => {
        setActivePinia(createPinia())
        localStorage.clear()
    })

    test('markSeen should make isSeen true only for that key', () => {
        const store = useSeenStore()
        expect(store.isSeen('folder:tomas')).toBe(false)

        store.markSeen('folder:tomas')

        expect(store.isSeen('folder:tomas')).toBe(true)
        expect(store.isSeen('folder:fraude')).toBe(false)
    })

    test('markSeen should not store the keys in the browser', () => {
        useSeenStore().markSeen('folder:tomas')

        expect(localStorage.getItem('seen')).toBeNull()
    })

    test('load should keep the keys that the service returns', async () => {
        const fakeService = {
            listSeen: () => Promise.resolve([{ getKey: () => 'folder:tomas' }])
        }
        const store = useSeenStore()

        await store.load(fakeService)

        expect(store.isSeen('folder:tomas')).toBe(true)
        expect(store.isSeen('folder:fraude')).toBe(false)
    })

    test('markSeen should tell the backend through the service', async () => {
        let received
        const fakeService = {
            listSeen: () => Promise.resolve([]),
            markSeen: (key) => {
                received = key
                return Promise.resolve()
            }
        }
        const store = useSeenStore()
        await store.load(fakeService)

        store.markSeen('folder:tomas')

        expect(received).toBe('folder:tomas')
    })

    test('isLoaded should be false until the keys have been loaded', async () => {
        const fakeService = {
            listSeen: () => Promise.resolve([])
        }
        const store = useSeenStore()
        expect(store.isLoaded).toBe(false)

        await store.load(fakeService)

        expect(store.isLoaded).toBe(true)
    })

    test('setSeen should keep the given keys and mark the store as loaded', () => {
        const store = useSeenStore()
        expect(store.isLoaded).toBe(false)

        store.setSeen(['folder:tomas', 'known:1'])

        expect(store.isSeen('folder:tomas')).toBe(true)
        expect(store.isSeen('known:1')).toBe(true)
        expect(store.isSeen('folder:fraude')).toBe(false)
        expect(store.isLoaded).toBe(true)
    })

})
