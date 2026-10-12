export default class PuzzleSummaryModel {

    constructor(id, title, type, displayOrder) {
        this.id = id
        this.title = title
        this.type = type
        this.displayOrder = displayOrder
    }

    getId() {
        return this.id
    }

    getTitle() {
        return this.title
    }

    getType() {
        return this.type
    }

    getDisplayOrder() {
        return this.displayOrder
    }

    static create(dto, mapper) {
        return new PuzzleSummaryModel(
            mapper.id(dto),
            mapper.title(dto),
            mapper.type(dto),
            mapper.displayOrder(dto)
        )
    }

}
