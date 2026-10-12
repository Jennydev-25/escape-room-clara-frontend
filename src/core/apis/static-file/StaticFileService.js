export default class StaticFileService {

    #repo

    constructor(repository) {
        this.#repo = repository
    }

    async getFileUrl(path) {
        const blob = await this.#repo.getFile(path)
        return URL.createObjectURL(blob)
    }

}
