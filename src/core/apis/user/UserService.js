import { userProfileMapper } from "@/core/mappers/user/user-profile-mapper";
import UserProfileModel from "@/core/models/user/UserProfileModel";

export default class UserService {

    #repo

    constructor(repository) {
        this.#repo = repository
    }

    async getProfile() {
        const dto = await this.#repo.getProfile()
        return UserProfileModel.create(dto, userProfileMapper)
    }

}
