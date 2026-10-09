import BaseRepository from "@/core/apis/base/BaseRepository";

export default class ContactRepository extends BaseRepository {

    constructor() {
        super(import.meta.env.VITE_API_URL)
    }

    async send(contactData) {
        return this.post('/contact', contactData)
    }

}
