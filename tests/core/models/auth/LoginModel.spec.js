import { loginMapper } from "@/core/mappers/auth/login-mapper";
import LoginModel from "@/core/models/auth/LoginModel";
import { describe, expect, test } from "vitest";

describe('LoginModel', () => {

    test('LoginModel should have a token and a refreshToken', () => {
        const token = 'jwt-token'
        const refreshToken = 'refresh-token'
        const login = new LoginModel(token, refreshToken)

        expect(login.getToken()).toEqual(token)
        expect(login.getRefreshToken()).toEqual(refreshToken)
    })

    test('create should build a LoginModel from a dto using a mapper', () => {
        const dto = { token: 'jwt-token', refreshToken: 'refresh-token' }

        const login = LoginModel.create(dto, loginMapper)

        expect(login.getToken()).toEqual(dto.token)
        expect(login.getRefreshToken()).toEqual(dto.refreshToken)
    })

})
