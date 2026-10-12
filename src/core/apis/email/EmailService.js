import { emailSummaryMapper } from "@/core/mappers/email/email-summary-mapper";
import EmailSummaryModel from "@/core/models/email/EmailSummaryModel";

export default class EmailService {

    #repo

    constructor(repository) {
        this.#repo = repository
    }

    async listInbox() {
        const dtos = await this.#repo.listInbox()
        return dtos.map((dto) => EmailSummaryModel.create(dto, emailSummaryMapper))
    }

}
