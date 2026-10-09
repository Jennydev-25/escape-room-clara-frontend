import axios from "axios";

export default class Repository {

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
            throw new Error("Algo paso")
        }
    }

    async getAxios() {
        try {
            const response = await axios.get(this.uri)
            return response.data
        } catch (error) {
            throw new Error("Algo paso")
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
            throw new Error("Algo paso")
        }
    }

}
