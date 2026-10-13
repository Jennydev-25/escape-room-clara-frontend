import ChatRepository from "@/core/apis/chat/ChatRepository";
import ChatService from "@/core/apis/chat/ChatService";
import { createPinia, setActivePinia } from "pinia";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";

describe('Integration - Chat Service', () => {

    beforeEach(() => {
        setActivePinia(createPinia())
    })

    afterEach(() => {
        vi.unstubAllGlobals()
    })

    test('listContacts should return the contacts as ContactSummaryModel from the backend response', async () => {
        vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
            ok: true,
            json: () => Promise.resolve([
                { contact: 'Redacción · El Faro', lastMessage: 'eres mi héroe', unread: 3 },
                { contact: 'Marina', lastMessage: 'hablamos luego', unread: 0 }
            ])
        }))
        const service = new ChatService(new ChatRepository())

        const contacts = await service.listContacts()

        expect(contacts).toHaveLength(2)
        expect(contacts[0].getContact()).toBe('Redacción · El Faro')
        expect(contacts[0].getUnread()).toBe(3)
        expect(contacts[1].getLastMessage()).toBe('hablamos luego')
    })

    test('listContacts should throw \'¡Ups! Algo salió mal\' when the backend responds with an error status', async () => {
        vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false }))
        const service = new ChatService(new ChatRepository())

        await expect(service.listContacts()).rejects.toThrow('¡Ups! Algo salió mal')
    })

    test('getConversation should return the messages as ChatMessageModel from the backend response', async () => {
        const fetchMock = vi.fn().mockResolvedValue({
            ok: true,
            json: () => Promise.resolve([
                { id: 2, contact: 'Redacción · El Faro', character: 'Marina', content: 'eres mi héroe', sentAt: '2025-06-10T10:54:00', displayOrder: 4, read: true },
                { id: 3, contact: 'Redacción · El Faro', character: 'Fermín', content: 'qué pesados', sentAt: '2025-06-10T11:01:00', displayOrder: 5, read: false }
            ])
        })
        vi.stubGlobal('fetch', fetchMock)
        const service = new ChatService(new ChatRepository())

        const messages = await service.getConversation('Marina')

        expect(fetchMock.mock.calls[0][0]).toContain('/chat/Marina')
        expect(messages).toHaveLength(2)
        expect(messages[0].getCharacter()).toBe('Marina')
        expect(messages[0].isRead()).toBe(true)
        expect(messages[1].getDisplayOrder()).toBe(5)
    })

    test('getConversation should throw \'¡Ups! Algo salió mal\' when the backend responds with an error status', async () => {
        vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false }))
        const service = new ChatService(new ChatRepository())

        await expect(service.getConversation('Marina')).rejects.toThrow('¡Ups! Algo salió mal')
    })

})

describe('Unit - Chat Service', () => {

    test('listContacts should map the repository response to a list of ContactSummaryModel', async () => {
        const repository = new ChatRepository()
        const service = new ChatService(repository)
        vi.spyOn(repository, 'listContacts').mockResolvedValue([
            { contact: 'Redacción · El Faro', lastMessage: 'eres mi héroe', unread: 3 },
            { contact: 'Marina', lastMessage: 'hablamos luego', unread: 0 }
        ])

        const contacts = await service.listContacts()

        expect(contacts).toHaveLength(2)
        expect(contacts[0].getContact()).toBe('Redacción · El Faro')
        expect(contacts[0].getUnread()).toBe(3)
        expect(contacts[1].getLastMessage()).toBe('hablamos luego')
    })

    test('getConversation should ask the repository for the contact and map the response to a list of ChatMessageModel', async () => {
        const repository = new ChatRepository()
        const service = new ChatService(repository)
        const spy = vi.spyOn(repository, 'getConversation').mockResolvedValue([
            { id: 2, contact: 'Redacción · El Faro', character: 'Marina', content: 'eres mi héroe', sentAt: '2025-06-10T10:54:00', displayOrder: 4, read: true },
            { id: 3, contact: 'Redacción · El Faro', character: 'Fermín', content: 'qué pesados', sentAt: '2025-06-10T11:01:00', displayOrder: 5, read: false }
        ])

        const messages = await service.getConversation('Redacción · El Faro')

        expect(spy).toHaveBeenCalledWith('Redacción · El Faro')
        expect(messages).toHaveLength(2)
        expect(messages[0].getCharacter()).toBe('Marina')
        expect(messages[0].isRead()).toBe(true)
        expect(messages[1].getDisplayOrder()).toBe(5)
    })

})
