import BaseRepository from "@/core/apis/base/BaseRepository";

export default class AuthRepository extends BaseRepository {

    constructor() {
        super(import.meta.env.VITE_API_URL)
    }

    async register(registerData) {
        return this.post('/auth/register', registerData)
    }

}
