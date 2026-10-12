import { folderSummaryMapper } from "@/core/mappers/folder/folder-summary-mapper";
import FolderSummaryModel from "@/core/models/folder/FolderSummaryModel";

export default class FolderService {

    #repo

    constructor(repository) {
        this.#repo = repository
    }

    async listFolders() {
        const dtos = await this.#repo.listFolders()
        return dtos.map((dto) => FolderSummaryModel.create(dto, folderSummaryMapper))
    }

}
