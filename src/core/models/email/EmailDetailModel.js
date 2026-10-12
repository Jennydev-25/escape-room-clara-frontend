export default class EmailDetailModel {

    constructor(id, sender, recipient, subject, sentDate, body) {
        this.id = id
        this.sender = sender
        this.recipient = recipient
        this.subject = subject
        this.sentDate = sentDate
        this.body = body
    }

    getId() {
        return this.id
    }

    getSender() {
        return this.sender
    }

    getRecipient() {
        return this.recipient
    }

    getSubject() {
        return this.subject
    }

    getSentDate() {
        return this.sentDate
    }

    getBody() {
        return this.body
    }

    static create(dto, mapper) {
        return new EmailDetailModel(
            mapper.id(dto),
            mapper.sender(dto),
            mapper.recipient(dto),
            mapper.subject(dto),
            mapper.sentDate(dto),
            mapper.body(dto)
        )
    }

}
