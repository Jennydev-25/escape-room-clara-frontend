import { createPinia, setActivePinia } from "pinia";
import { useAuthStore } from "@/stores/auth";
import { describe, expect, test, beforeEach } from "vitest";

describe('useAuthStore', () => {

    beforeEach(() => {
        setActivePinia(createPinia())
        localStorage.clear()
    })

    test('setSession should store the token and the refreshToken', () => {
        const store = useAuthStore()

        store.setSession('jwt-token', 'refresh-token')

        expect(store.token).toBe('jwt-token')
        expect(store.refreshToken).toBe('refresh-token')
    })

    test('logout should clear the token and the refreshToken', () => {
        const store = useAuthStore()
        store.setSession('jwt-token', 'refresh-token')

        store.logout()

        expect(store.token).toBeNull()
        expect(store.refreshToken).toBeNull()
        expect(localStorage.getItem('token')).toBeNull()
        expect(localStorage.getItem('refreshToken')).toBeNull()
    })

})
