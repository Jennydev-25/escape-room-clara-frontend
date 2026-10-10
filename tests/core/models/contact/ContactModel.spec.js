import { contactMapper } from "@/core/mappers/contact/contact-mapper";
import ContactModel from "@/core/models/contact/ContactModel";
import { describe, expect, test } from "vitest";

describe('ContactModel', () => {

    test('ContactModel should have a message', () => {
        const message = 'Mensaje enviado correctamente'
        const contact = new ContactModel(message)

        expect(contact.getMessage()).toEqual(message)
    })

    test('create should build a ContactModel from a dto using a mapper', () => {
        const dto = { message: 'Mensaje enviado correctamente' }

        const contact = ContactModel.create(dto, contactMapper)

        expect(contact.getMessage()).toEqual(dto.message)
    })

})
