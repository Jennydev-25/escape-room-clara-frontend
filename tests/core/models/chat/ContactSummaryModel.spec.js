import { contactSummaryMapper } from "@/core/mappers/chat/contact-summary-mapper";
import ContactSummaryModel from "@/core/models/chat/ContactSummaryModel";
import { describe, expect, test } from "vitest";

describe('ContactSummaryModel', () => {

    test('ContactSummaryModel should expose its data', () => {
        const contactSummaryModel = new ContactSummaryModel(
            'Redacción · El Faro',
            'eres mi héroe',
            3
        )

        expect(contactSummaryModel.getContact()).toEqual('Redacción · El Faro')
        expect(contactSummaryModel.getLastMessage()).toEqual('eres mi héroe')
        expect(contactSummaryModel.getUnread()).toEqual(3)
    })

    test('create should build a ContactSummaryModel from a dto using a mapper', () => {
        const dto = {
            contact: 'Redacción · El Faro',
            lastMessage: 'eres mi héroe',
            unread: 3
        }

        const contactSummaryModel = ContactSummaryModel.create(dto, contactSummaryMapper)

        expect(contactSummaryModel.getContact()).toEqual('Redacción · El Faro')
        expect(contactSummaryModel.getLastMessage()).toEqual('eres mi héroe')
        expect(contactSummaryModel.getUnread()).toEqual(3)
    })

})
