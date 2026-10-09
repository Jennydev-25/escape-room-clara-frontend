import Repository from "@/core/models/Repository";

export default class AuthRepository extends Repository {

    constructor() {
        super(import.meta.env.VITE_API_URL)
    }

    async register(registerData) {
        return this.post('/auth/register', registerData)
    }

}
