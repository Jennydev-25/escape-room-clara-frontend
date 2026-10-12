export default class FolderSummaryModel {

    constructor(code, name) {
        this.code = code
        this.name = name
    }

    getCode() {
        return this.code
    }

    getName() {
        return this.name
    }

    static create(dto, mapper) {
        return new FolderSummaryModel(
            mapper.code(dto),
            mapper.name(dto)
        )
    }

}
