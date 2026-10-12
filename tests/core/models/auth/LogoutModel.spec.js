import LogoutModel from "@/core/models/auth/LogoutModel";
import { describe, expect, test } from "vitest";

describe('LogoutModel', () => {

    test('LogoutModel should expose its data', () => {
        const logoutModel = new LogoutModel(
            'Sesión cerrada correctamente'
        )

        expect(logoutModel.getMessage()).toEqual('Sesión cerrada correctamente')
    })

})
