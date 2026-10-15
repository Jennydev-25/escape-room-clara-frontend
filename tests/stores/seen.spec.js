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

    test('markSeen should keep the seen keys for the next visit', () => {
        useSeenStore().markSeen('folder:tomas')

        setActivePinia(createPinia())

        expect(useSeenStore().isSeen('folder:tomas')).toBe(true)
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

})
