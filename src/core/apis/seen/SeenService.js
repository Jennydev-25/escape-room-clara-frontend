import { seenMapper } from "@/core/mappers/seen/seen-mapper";
import SeenModel from "@/core/models/seen/SeenModel";

export default class SeenService {

    #repo

    constructor(repository) {
        this.#repo = repository
    }

    async listSeen() {
        const dtos = await this.#repo.listSeen()
        return dtos.map((dto) => SeenModel.create(dto, seenMapper))
    }

}
