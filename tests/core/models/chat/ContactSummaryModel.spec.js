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

})
