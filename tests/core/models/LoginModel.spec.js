import LoginModel from "@/core/models/LoginModel";
import { describe, expect, test } from "vitest";

describe('LoginModel', () => {

    test('LoginModel should have a token and a refreshToken', () => {
        const token = 'jwt-token'
        const refreshToken = 'refresh-token'
        const login = new LoginModel(token, refreshToken)

        expect(login.getToken()).toEqual(token)
        expect(login.getRefreshToken()).toEqual(refreshToken)
    })

})
