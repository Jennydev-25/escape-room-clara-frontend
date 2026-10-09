import { registerMapper } from "@/core/mappers/register-mapper";
import RegisterModel from "@/core/models/RegisterModel";

export default class AuthService {

    #repo

    constructor(repository) {
        this.#repo = repository
    }

    async register(registerData) {
        const dto = await this.#repo.register(registerData)
        return RegisterModel.create(dto, registerMapper)
    }

}
