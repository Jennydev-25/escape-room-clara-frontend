import BaseRepository from "@/core/apis/base/BaseRepository";

export default class ChatRepository extends BaseRepository {

    constructor() {
        super(import.meta.env.VITE_API_URL)
    }

    async listContacts() {
        return this.authGet('/chat')
    }

    async getConversation(contact) {
        return this.authGet(`/chat/${contact}`)
    }

}
