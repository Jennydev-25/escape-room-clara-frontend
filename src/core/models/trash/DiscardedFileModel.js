export default class DiscardedFileModel {

    constructor(id, name, type, body) {
        this.id = id
        this.name = name
        this.type = type
        this.body = body
    }

    getId() {
        return this.id
    }

    getName() {
        return this.name
    }

    getType() {
        return this.type
    }

    getBody() {
        return this.body
    }

}
