export default class UserProfileModel {

    constructor(alias, email, avatarId, fullName) {
        this.alias = alias
        this.email = email
        this.avatarId = avatarId
        this.fullName = fullName
    }

    getAlias() {
        return this.alias
    }

    getEmail() {
        return this.email
    }

    getAvatarId() {
        return this.avatarId
    }

    getFullName() {
        return this.fullName
    }

    static create(dto, mapper) {
        return new UserProfileModel(
            mapper.alias(dto),
            mapper.email(dto),
            mapper.avatarId(dto),
            mapper.fullName(dto)
        )
    }

}
