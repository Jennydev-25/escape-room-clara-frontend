import ChatMessageModel from "@/core/models/chat/ChatMessageModel";
import { describe, expect, test } from "vitest";

describe('ChatMessageModel', () => {

    test('ChatMessageModel should expose its data', () => {
        const chatMessageModel = new ChatMessageModel(
            2,
            'Redacción · El Faro',
            'Marina',
            '¿alguien tiene el cargador de USB-C? el mío ha muerto en combate',
            '2025-06-10T10:52:00',
            2,
            false
        )

        expect(chatMessageModel.getId()).toEqual(2)
        expect(chatMessageModel.getContact()).toEqual('Redacción · El Faro')
        expect(chatMessageModel.getCharacter()).toEqual('Marina')
        expect(chatMessageModel.getContent()).toEqual('¿alguien tiene el cargador de USB-C? el mío ha muerto en combate')
        expect(chatMessageModel.getSentAt()).toEqual('2025-06-10T10:52:00')
        expect(chatMessageModel.getDisplayOrder()).toEqual(2)
        expect(chatMessageModel.isRead()).toEqual(false)
    })

})
