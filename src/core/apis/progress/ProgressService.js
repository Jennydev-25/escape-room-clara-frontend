import { progressMapper } from "@/core/mappers/progress/progress-mapper";
import ProgressModel from "@/core/models/progress/ProgressModel";

export default class ProgressService {

    #repo

    constructor(repository) {
        this.#repo = repository
    }

    async getProgress() {
        const dto = await this.#repo.getProgress()
        return ProgressModel.create(dto, progressMapper)
    }

    async accumulateTime(timeData) {
        const dto = await this.#repo.accumulateTime(timeData)
        return ProgressModel.create(dto, progressMapper)
    }

}
