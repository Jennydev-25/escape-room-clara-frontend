import ContactModel from "@/core/models/ContactModel";
import { describe, expect, test } from "vitest";

describe('ContactModel', () => {

    test('ContactModel should have a message', () => {
        const message = 'Mensaje enviado correctamente'
        const contact = new ContactModel(message)

        expect(contact.getMessage()).toEqual(message)
    })

})
