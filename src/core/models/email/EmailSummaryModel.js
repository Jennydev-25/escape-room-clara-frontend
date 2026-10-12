export default class EmailSummaryModel {

    constructor(id, sender, subject, sentDate, read) {
        this.id = id
        this.sender = sender
        this.subject = subject
        this.sentDate = sentDate
        this.read = read
    }

    getId() {
        return this.id
    }

    getSender() {
        return this.sender
    }

    getSubject() {
        return this.subject
    }

    getSentDate() {
        return this.sentDate
    }

    isRead() {
        return this.read
    }

}
