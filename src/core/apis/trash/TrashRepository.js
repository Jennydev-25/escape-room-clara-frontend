import BaseRepository from "@/core/apis/base/BaseRepository";

export default class TrashRepository extends BaseRepository {

    constructor() {
        super(import.meta.env.VITE_API_URL)
    }

    async listDiscardedFiles() {
        return this.authGet('/trash')
    }

}
