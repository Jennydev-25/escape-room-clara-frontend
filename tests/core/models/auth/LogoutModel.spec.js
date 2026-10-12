import { logoutMapper } from "@/core/mappers/auth/logout-mapper";
import LogoutModel from "@/core/models/auth/LogoutModel";
import { describe, expect, test } from "vitest";

describe('LogoutModel', () => {

    test('LogoutModel should expose its data', () => {
        const logoutModel = new LogoutModel(
            'Sesión cerrada correctamente'
        )

        expect(logoutModel.getMessage()).toEqual('Sesión cerrada correctamente')
    })

    test('create should build a LogoutModel from a dto using a mapper', () => {
        const dto = {
            message: 'Sesión cerrada correctamente'
        }

        const logoutModel = LogoutModel.create(dto, logoutMapper)

        expect(logoutModel.getMessage()).toEqual('Sesión cerrada correctamente')
    })

})
