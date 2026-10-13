export default class ChatMessageModel {

    constructor(id, contact, character, content, sentAt, displayOrder, read) {
        this.id = id
        this.contact = contact
        this.character = character
        this.content = content
        this.sentAt = sentAt
        this.displayOrder = displayOrder
        this.read = read
    }

    getId() {
        return this.id
    }

    getContact() {
        return this.contact
    }

    getCharacter() {
        return this.character
    }

    getContent() {
        return this.content
    }

    getSentAt() {
        return this.sentAt
    }

    getDisplayOrder() {
        return this.displayOrder
    }

    isRead() {
        return this.read
    }

    static create(dto, mapper) {
        return new ChatMessageModel(
            mapper.id(dto),
            mapper.contact(dto),
            mapper.character(dto),
            mapper.content(dto),
            mapper.sentAt(dto),
            mapper.displayOrder(dto),
            mapper.read(dto)
        )
    }

}
