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

}
