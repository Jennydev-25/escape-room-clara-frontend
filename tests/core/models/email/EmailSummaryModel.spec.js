import EmailSummaryModel from "@/core/models/email/EmailSummaryModel";
import { describe, expect, test } from "vitest";

describe('EmailSummaryModel', () => {

    test('EmailSummaryModel should expose its data', () => {
        const emailSummaryModel = new EmailSummaryModel(
            1,
            'Marina Ortiz',
            'Lo de esta noche',
            '2025-06-03',
            false
        )

        expect(emailSummaryModel.getId()).toEqual(1)
        expect(emailSummaryModel.getSender()).toEqual('Marina Ortiz')
        expect(emailSummaryModel.getSubject()).toEqual('Lo de esta noche')
        expect(emailSummaryModel.getSentDate()).toEqual('2025-06-03')
        expect(emailSummaryModel.isRead()).toEqual(false)
    })

})
