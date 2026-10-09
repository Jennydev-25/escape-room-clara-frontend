import { registerMapper } from "@/core/mappers/register-mapper";
import RegisterModel from "@/core/models/RegisterModel";
import { describe, expect, test } from "vitest";

describe('RegisterModel', () => {

    test('RegisterModel should have a message', () => {
        const message = 'Usuario registrado correctamente'
        const register = new RegisterModel(message)

        expect(register.getMessage()).toEqual(message)
    })

    test('create should build a RegisterModel from a dto using a mapper', () => {
        const dto = { message: 'Usuario registrado correctamente' }

        const register = RegisterModel.create(dto, registerMapper)

        expect(register.getMessage()).toEqual(dto.message)
    })

})
