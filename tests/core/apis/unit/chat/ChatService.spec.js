import ChatRepository from "@/core/apis/chat/ChatRepository";
import ChatService from "@/core/apis/chat/ChatService";
import { describe, expect, test, vi } from "vitest";

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

})
