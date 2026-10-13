import { useAuthStore } from "@/stores/auth";

export default class BaseRepository {

    static #refreshing = null

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

    async post(path, body) {
        let message = "¡Ups! Algo salió mal"

        try {
            const response = await fetch(`${this.uri}${path}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            })

            if (!response.ok) {
                message = await this.#messageOf(response)
                throw new Error('Error en la respuesta');
            }

            const data = await response.json()
            return data
        } catch (error) {
            throw new Error(message)
        }
    }

    // mensaje que manda el backend en el error; si no hay, el genérico
    async #messageOf(response) {
        try {
            const error = await response.json()
            return error.message || "¡Ups! Algo salió mal"
        } catch {
            return "¡Ups! Algo salió mal"
        }
    }

    async authGet(path) {
        try {
            const response = await this.#authFetch(`${this.uri}${path}`)

            if (!response.ok) {
                throw new Error('Error en la respuesta');
            }

            return await response.json()
        } catch (error) {
            throw new Error("¡Ups! Algo salió mal")
        }
    }

    async authGetBlob(url) {
        try {
            const response = await this.#authFetch(url)

            if (!response.ok) {
                throw new Error('Error en la respuesta');
            }

            return await response.blob()
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
        let message = "¡Ups! Algo salió mal"

        try {
            const response = await this.#authFetch(`${this.uri}${path}`, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            })

            if (!response.ok) {
                message = await this.#messageOf(response)
                throw new Error('Error en la respuesta');
            }

            if (response.status === 204) {
                return null
            }

            return await response.json()
        } catch (error) {
            throw new Error(message)
        }
    }

    async #authFetch(url, options = {}) {
        const authStore = useAuthStore()
        const send = () => fetch(url, {
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

    #refreshSession() {
        BaseRepository.#refreshing ??= this.#requestNewTokens().finally(() => {
            BaseRepository.#refreshing = null
        })

        return BaseRepository.#refreshing
    }

    async #requestNewTokens() {
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
