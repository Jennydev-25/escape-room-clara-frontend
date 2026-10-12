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

    async completeProfile(profileData) {
        const dto = await this.#repo.completeProfile(profileData)
        return UserProfileModel.create(dto, userProfileMapper)
    }

    async updateProfile(profileData) {
        const dto = await this.#repo.updateProfile(profileData)
        return UserProfileModel.create(dto, userProfileMapper)
    }

}
