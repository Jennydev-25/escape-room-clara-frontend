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

}
