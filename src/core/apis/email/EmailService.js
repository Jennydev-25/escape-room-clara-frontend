import { emailDetailMapper } from "@/core/mappers/email/email-detail-mapper";
import { emailSummaryMapper } from "@/core/mappers/email/email-summary-mapper";
import EmailDetailModel from "@/core/models/email/EmailDetailModel";
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

    async getEmail(id) {
        const dto = await this.#repo.getEmail(id)
        return EmailDetailModel.create(dto, emailDetailMapper)
    }

}
