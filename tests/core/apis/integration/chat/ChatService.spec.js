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

})
