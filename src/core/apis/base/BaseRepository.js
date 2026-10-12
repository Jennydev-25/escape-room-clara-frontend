import axios from "axios";
import { useAuthStore } from "@/stores/auth";

export default class BaseRepository {

    constructor(uri) {
        this.uri = uri
    }

    getUri() {
        return this.uri
    }

    async get() {
        try {
            const response = await fetch(this.uri)

            if (!response.ok) {
                throw new Error('Error en la respuesta');
            }

            const data = await response.json()
            return data
        } catch (error) {
            throw new Error("¡Ups! Algo salió mal")
        }
    }

    async getAxios() {
        try {
            const response = await axios.get(this.uri)
            return response.data
        } catch (error) {
            throw new Error("¡Ups! Algo salió mal")
        }
    }

    async post(path, body) {
        try {
            const response = await fetch(`${this.uri}${path}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            })

            if (!response.ok) {
                throw new Error('Error en la respuesta');
            }

            const data = await response.json()
            return data
        } catch (error) {
            throw new Error("¡Ups! Algo salió mal")
        }
    }

    async authGet(path) {
        try {
            const response = await this.#authFetch(path)

            if (!response.ok) {
                throw new Error('Error en la respuesta');
            }

            return await response.json()
        } catch (error) {
            throw new Error("¡Ups! Algo salió mal")
        }
    }

    async authPost(path, body) {
        return this.#authSend('POST', path, body)
    }

    async authPut(path, body) {
        return this.#authSend('PUT', path, body)
    }

    async authPatch(path, body) {
        return this.#authSend('PATCH', path, body)
    }

    async #authSend(method, path, body) {
        try {
            const response = await this.#authFetch(path, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            })

            if (!response.ok) {
                throw new Error('Error en la respuesta');
            }

            if (response.status === 204) {
                return null
            }

            return await response.json()
        } catch (error) {
            throw new Error("¡Ups! Algo salió mal")
        }
    }

    async #authFetch(path, options = {}) {
        const authStore = useAuthStore()
        const send = () => fetch(`${this.uri}${path}`, {
            ...options,
            headers: { ...options.headers, Authorization: `Bearer ${authStore.token}` },
        })

        const response = await send()

        if (response.status !== 401) {
            return response
        }

        if (!await this.#refreshSession()) {
            return response
        }

        return send()
    }

    async #refreshSession() {
        const authStore = useAuthStore()

        try {
            const response = await fetch(`${this.uri}/auth/refresh`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ refreshToken: authStore.refreshToken }),
            })

            if (!response.ok) {
                throw new Error('Error en la respuesta');
            }

            const data = await response.json()
            authStore.setSession(data.token, data.refreshToken)
            return true
        } catch (error) {
            authStore.logout()
            return false
        }
    }

}
