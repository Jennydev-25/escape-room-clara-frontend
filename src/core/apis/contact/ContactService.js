import { contactMapper } from "@/core/mappers/contact-mapper";
import ContactModel from "@/core/models/ContactModel";

export default class ContactService {

    #repo

    constructor(repository) {
        this.#repo = repository
    }

    async send(contactData) {
        const dto = await this.#repo.send(contactData)
        return ContactModel.create(dto, contactMapper)
    }

}
