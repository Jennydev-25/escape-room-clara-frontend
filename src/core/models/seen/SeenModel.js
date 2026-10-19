export default class SeenModel {

    constructor(key, seenAt) {
        this.key = key
        this.seenAt = seenAt
    }

    getKey() {
        return this.key
    }

    getSeenAt() {
        return this.seenAt
    }

    static create(dto, mapper) {
        return new SeenModel(
            mapper.key(dto),
            mapper.seenAt(dto)
        )
    }

}
