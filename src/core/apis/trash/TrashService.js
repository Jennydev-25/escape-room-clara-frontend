import { discardedFileMapper } from "@/core/mappers/trash/discarded-file-mapper";
import DiscardedFileModel from "@/core/models/trash/DiscardedFileModel";

export default class TrashService {

    #repo

    constructor(repository) {
        this.#repo = repository
    }

    async listDiscardedFiles() {
        const dtos = await this.#repo.listDiscardedFiles()
        return dtos.map((dto) => DiscardedFileModel.create(dto, discardedFileMapper))
    }

}
