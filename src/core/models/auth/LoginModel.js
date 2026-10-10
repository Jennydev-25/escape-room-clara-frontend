export default class LoginModel {

    constructor(token, refreshToken) {
        this.token = token
        this.refreshToken = refreshToken
    }

    getToken() {
        return this.token
    }

    getRefreshToken() {
        return this.refreshToken
    }

    static create(dto, mapper) {
        return new LoginModel(mapper.token(dto), mapper.refreshToken(dto))
    }

}
