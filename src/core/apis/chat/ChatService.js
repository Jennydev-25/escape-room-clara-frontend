import { contactSummaryMapper } from "@/core/mappers/chat/contact-summary-mapper";
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

}
