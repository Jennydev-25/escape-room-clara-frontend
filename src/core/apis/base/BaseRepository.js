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
        const authStore = useAuthStore()

        try {
            const response = await fetch(`${this.uri}${path}`, {
                headers: { Authorization: `Bearer ${authStore.token}` },
            })

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
        const authStore = useAuthStore()

        try {
            const response = await fetch(`${this.uri}${path}`, {
                method,
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${authStore.token}` },
                body: JSON.stringify(body),
            })

            if (!response.ok) {
                throw new Error('Error en la respuesta');
            }

            return await response.json()
        } catch (error) {
            throw new Error("¡Ups! Algo salió mal")
        }
    }

}
