export default class ContactSummaryModel {

    constructor(contact, lastMessage, unread) {
        this.contact = contact
        this.lastMessage = lastMessage
        this.unread = unread
    }

    getContact() {
        return this.contact
    }

    getLastMessage() {
        return this.lastMessage
    }

    getUnread() {
        return this.unread
    }

    static create(dto, mapper) {
        return new ContactSummaryModel(
            mapper.contact(dto),
            mapper.lastMessage(dto),
            mapper.unread(dto)
        )
    }

}
