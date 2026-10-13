import { emailDetailMapper } from "@/core/mappers/email/email-detail-mapper";
import EmailDetailModel from "@/core/models/email/EmailDetailModel";
import { describe, expect, test } from "vitest";

describe('EmailDetailModel', () => {

    test('EmailDetailModel should expose its data', () => {
        const emailDetailModel = new EmailDetailModel(
            1,
            'Marina Ortiz',
            'Clara Vega',
            'Lo de esta noche',
            '2025-06-03',
            'Clara, ¿vienes luego a la despedida de Fermín?'
        )

        expect(emailDetailModel.getId()).toEqual(1)
        expect(emailDetailModel.getSender()).toEqual('Marina Ortiz')
        expect(emailDetailModel.getRecipient()).toEqual('Clara Vega')
        expect(emailDetailModel.getSubject()).toEqual('Lo de esta noche')
        expect(emailDetailModel.getSentDate()).toEqual('2025-06-03')
        expect(emailDetailModel.getBody()).toEqual('Clara, ¿vienes luego a la despedida de Fermín?')
    })

    test('create should build a EmailDetailModel from a dto using a mapper', () => {
        const dto = {
            id: 1,
            sender: 'Marina Ortiz',
            recipient: 'Clara Vega',
            subject: 'Lo de esta noche',
            sentDate: '2025-06-03',
            body: 'Clara, ¿vienes luego a la despedida de Fermín?'
        }

        const emailDetailModel = EmailDetailModel.create(dto, emailDetailMapper)

        expect(emailDetailModel.getId()).toEqual(1)
        expect(emailDetailModel.getSender()).toEqual('Marina Ortiz')
        expect(emailDetailModel.getRecipient()).toEqual('Clara Vega')
        expect(emailDetailModel.getSubject()).toEqual('Lo de esta noche')
        expect(emailDetailModel.getSentDate()).toEqual('2025-06-03')
        expect(emailDetailModel.getBody()).toEqual('Clara, ¿vienes luego a la despedida de Fermín?')
    })

})
