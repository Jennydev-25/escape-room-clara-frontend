import BaseRepository from "@/core/apis/base/BaseRepository";

export default class SeenRepository extends BaseRepository {

    constructor() {
        super(import.meta.env.VITE_API_URL)
    }

    async listSeen() {
        return this.authGet('/seen')
    }

}
