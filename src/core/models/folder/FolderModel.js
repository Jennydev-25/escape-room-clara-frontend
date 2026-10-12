export default class FolderModel {

    constructor(code, name, puzzles) {
        this.code = code
        this.name = name
        this.puzzles = puzzles
    }

    getCode() {
        return this.code
    }

    getName() {
        return this.name
    }

    getPuzzles() {
        return this.puzzles
    }

    static create(dto, mapper) {
        return new FolderModel(
            mapper.code(dto),
            mapper.name(dto),
            mapper.puzzles(dto)
        )
    }

}
