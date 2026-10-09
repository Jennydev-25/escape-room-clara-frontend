export default class ContactModel {

    constructor(message) {
        this.message = message
    }

    getMessage() {
        return this.message
    }

    static create(dto, mapper) {
        return new ContactModel(mapper.message(dto))
    }

}
