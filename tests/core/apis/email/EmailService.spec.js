import EmailRepository from "@/core/apis/email/EmailRepository";
import EmailService from "@/core/apis/email/EmailService";
import { describe, expect, test } from "vitest";

describe('Integration - Email Service', () => {

    test('listInbox should throw \'¡Ups! Algo salió mal\' when the uri is invalid', async () => {
        const repository = new EmailRepository()
        repository.uri = ''
        const service = new EmailService(repository)

        await expect(service.listInbox()).rejects.toThrow('¡Ups! Algo salió mal')
    })

    test('getEmail should throw \'¡Ups! Algo salió mal\' when the uri is invalid', async () => {
        const repository = new EmailRepository()
        repository.uri = ''
        const service = new EmailService(repository)

        await expect(service.getEmail(1)).rejects.toThrow('¡Ups! Algo salió mal')
    })

})

describe('Unit - Email Service', () => {

    test('listInbox should map the backend response to a list of EmailSummaryModel', async () => {
        const fakeRepository = {
            listInbox: () => Promise.resolve([
                { id: 1, sender: 'Marina Ortiz', subject: 'Lo de esta noche', sentDate: '2025-06-03', read: false },
                { id: 2, sender: 'Recursos Humanos — El Faro de San Adrián', subject: 'Recordatorio: revisión de días de vacaciones pendientes', sentDate: '2025-06-05', read: true }
            ])
        }
        const service = new EmailService(fakeRepository)

        const emails = await service.listInbox()

        expect(emails).toHaveLength(2)
        expect(emails[0].getSender()).toBe('Marina Ortiz')
        expect(emails[0].isRead()).toBe(false)
        expect(emails[1].isRead()).toBe(true)
    })

    test('getEmail should ask for the email id and map the response to an EmailDetailModel', async () => {
        let receivedId
        const fakeRepository = {
            getEmail: (id) => {
                receivedId = id
                return Promise.resolve({
                    id: 1,
                    sender: 'Marina Ortiz',
                    recipient: 'Clara Vega',
                    subject: 'Lo de esta noche',
                    sentDate: '2025-06-03',
                    body: 'Clara, ¿vienes luego a la despedida de Fermín?'
                })
            }
        }
        const service = new EmailService(fakeRepository)

        const email = await service.getEmail(1)

        expect(receivedId).toBe(1)
        expect(email.getRecipient()).toBe('Clara Vega')
        expect(email.getBody()).toBe('Clara, ¿vienes luego a la despedida de Fermín?')
    })

})
