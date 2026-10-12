import { loginMapper } from "@/core/mappers/auth/login-mapper";
import { logoutMapper } from "@/core/mappers/auth/logout-mapper";
import { registerMapper } from "@/core/mappers/auth/register-mapper";
import LoginModel from "@/core/models/auth/LoginModel";
import LogoutModel from "@/core/models/auth/LogoutModel";
import RegisterModel from "@/core/models/auth/RegisterModel";

export default class AuthService {

    #repo

    constructor(repository) {
        this.#repo = repository
    }

    async register(registerData) {
        const dto = await this.#repo.register(registerData)
        return RegisterModel.create(dto, registerMapper)
    }

    async login(email, password) {
        const dto = await this.#repo.login(email, password)
        return LoginModel.create(dto, loginMapper)
    }

    async refresh(refreshData) {
        const dto = await this.#repo.refresh(refreshData)
        return LoginModel.create(dto, loginMapper)
    }

    async logout(logoutData) {
        const dto = await this.#repo.logout(logoutData)
        return LogoutModel.create(dto, logoutMapper)
    }

}
