import BaseRepository from "@/core/apis/base/BaseRepository";

export default class UserRepository extends BaseRepository {

    constructor() {
        super(import.meta.env.VITE_API_URL)
    }

    async getProfile() {
        return this.authGet('/users/me')
    }

}
