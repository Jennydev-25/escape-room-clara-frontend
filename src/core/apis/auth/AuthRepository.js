import BaseRepository from "@/core/apis/base/BaseRepository";

export default class AuthRepository extends BaseRepository {

    constructor() {
        super(import.meta.env.VITE_API_URL)
    }

    async register(registerData) {
        return this.post('/auth/register', registerData)
    }

    async login(email, password) {
        try {
            const response = await fetch(`${this.uri}/auth/login`, {
                method: 'POST',
                headers: {
                    'Authorization': `Basic ${btoa(`${email}:${password}`)}`,
                },
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

}
