import BaseRepository from "@/core/apis/base/BaseRepository";

export default class EmailRepository extends BaseRepository {

    constructor() {
        super(import.meta.env.VITE_API_URL)
    }

    async listInbox() {
        return this.authGet('/emails')
    }

    async getEmail(id) {
        return this.authGet(`/emails/${id}`)
    }

}
