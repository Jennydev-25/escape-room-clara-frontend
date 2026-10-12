import { emailSummaryMapper } from "@/core/mappers/email/email-summary-mapper";
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

    test('create should build a EmailSummaryModel from a dto using a mapper', () => {
        const dto = {
            id: 1,
            sender: 'Marina Ortiz',
            subject: 'Lo de esta noche',
            sentDate: '2025-06-03',
            read: false
        }

        const emailSummaryModel = EmailSummaryModel.create(dto, emailSummaryMapper)

        expect(emailSummaryModel.getId()).toEqual(1)
        expect(emailSummaryModel.getSender()).toEqual('Marina Ortiz')
        expect(emailSummaryModel.getSubject()).toEqual('Lo de esta noche')
        expect(emailSummaryModel.getSentDate()).toEqual('2025-06-03')
        expect(emailSummaryModel.isRead()).toEqual(false)
    })

})
