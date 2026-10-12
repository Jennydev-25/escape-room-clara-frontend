import { chatMessageMapper } from "@/core/mappers/chat/chat-message-mapper";
import { contactSummaryMapper } from "@/core/mappers/chat/contact-summary-mapper";
import ChatMessageModel from "@/core/models/chat/ChatMessageModel";
import ContactSummaryModel from "@/core/models/chat/ContactSummaryModel";

export default class ChatService {

    #repo

    constructor(repository) {
        this.#repo = repository
    }

    async listContacts() {
        const dtos = await this.#repo.listContacts()
        return dtos.map((dto) => ContactSummaryModel.create(dto, contactSummaryMapper))
    }

    async getConversation(contact) {
        const dtos = await this.#repo.getConversation(contact)
        return dtos.map((dto) => ChatMessageModel.create(dto, chatMessageMapper))
    }

}
