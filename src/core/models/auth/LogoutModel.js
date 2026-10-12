export default class LogoutModel {

    constructor(message) {
        this.message = message
    }

    getMessage() {
        return this.message
    }

    static create(dto, mapper) {
        return new LogoutModel(
            mapper.message(dto)
        )
    }

}
