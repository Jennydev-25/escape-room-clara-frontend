import { folderMapper } from "@/core/mappers/folder/folder-mapper";
import { folderSummaryMapper } from "@/core/mappers/folder/folder-summary-mapper";
import FolderModel from "@/core/models/folder/FolderModel";
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

    async getFolder(code) {
        const dto = await this.#repo.getFolder(code)
        return FolderModel.create(dto, folderMapper)
    }

}
