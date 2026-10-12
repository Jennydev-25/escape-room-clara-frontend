import BaseRepository from "@/core/apis/base/BaseRepository";

export default class FolderRepository extends BaseRepository {

    constructor() {
        super(import.meta.env.VITE_API_URL)
    }

    async listFolders() {
        return this.authGet('/folders')
    }

    async getFolder(code) {
        return this.authGet(`/folders/${code}`)
    }

}
