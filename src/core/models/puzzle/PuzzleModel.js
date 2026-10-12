export default class PuzzleModel {

    constructor(id, type, minChapter, displayOrder, files, question) {
        this.id = id
        this.type = type
        this.minChapter = minChapter
        this.displayOrder = displayOrder
        this.files = files
        this.question = question
    }

    getId() {
        return this.id
    }

    getType() {
        return this.type
    }

    getMinChapter() {
        return this.minChapter
    }

    getDisplayOrder() {
        return this.displayOrder
    }

    getFiles() {
        return this.files
    }

    getQuestion() {
        return this.question
    }

}
