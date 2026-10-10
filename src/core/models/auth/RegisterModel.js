export default class RegisterModel {

    constructor(message) {
        this.message = message
    }

    getMessage() {
        return this.message
    }

    static create(dto, mapper) {
        return new RegisterModel(mapper.message(dto))
    }

}
