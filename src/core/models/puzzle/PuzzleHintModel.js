export default class PuzzleHintModel {

    constructor(number, text) {
        this.number = number
        this.text = text
    }

    getNumber() {
        return this.number
    }

    getText() {
        return this.text
    }

    static create(dto, mapper) {
        return new PuzzleHintModel(
            mapper.number(dto),
            mapper.text(dto)
        )
    }

}
