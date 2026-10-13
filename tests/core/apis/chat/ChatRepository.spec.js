import ChatRepository from "@/core/apis/chat/ChatRepository";
import { describe, expect, test } from "vitest";

describe('Integration - Chat Repository', () => {

    test('listContacts should throw \'¡Ups! Algo salió mal\' when the uri is invalid', async () => {
        const repository = new ChatRepository()
        repository.uri = ''

        await expect(repository.listContacts()).rejects.toThrow('¡Ups! Algo salió mal')
    })

    test('getConversation should throw \'¡Ups! Algo salió mal\' when the uri is invalid', async () => {
        const repository = new ChatRepository()
        repository.uri = ''

        await expect(repository.getConversation('Marina')).rejects.toThrow('¡Ups! Algo salió mal')
    })

})
