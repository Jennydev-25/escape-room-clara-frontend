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

}
