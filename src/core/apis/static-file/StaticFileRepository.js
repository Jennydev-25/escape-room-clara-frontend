import BaseRepository from "@/core/apis/base/BaseRepository";

export default class StaticFileRepository extends BaseRepository {

    constructor() {
        super(import.meta.env.VITE_API_URL)
    }

    async getFile(path) {
        return this.authGetBlob(`${new URL(this.uri).origin}${path}`)
    }

}
