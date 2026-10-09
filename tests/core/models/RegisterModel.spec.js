import RegisterModel from "@/core/models/RegisterModel";
import { describe, expect, test } from "vitest";

describe('RegisterModel', () => {

    test('RegisterModel should have a message', () => {
        const message = 'Usuario registrado correctamente'
        const register = new RegisterModel(message)

        expect(register.getMessage()).toEqual(message)
    })

})
