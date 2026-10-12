export default class ProgressModel {

    constructor(currentChapter, hudLetters, investigationSubmitted, timeSpentSeconds, freeNote, updatedAt, lastHudLetterAdded) {
        this.currentChapter = currentChapter
        this.hudLetters = hudLetters
        this.investigationSubmitted = investigationSubmitted
        this.timeSpentSeconds = timeSpentSeconds
        this.freeNote = freeNote
        this.updatedAt = updatedAt
        this.lastHudLetterAdded = lastHudLetterAdded
    }

    getCurrentChapter() {
        return this.currentChapter
    }

    getHudLetters() {
        return this.hudLetters
    }

    isInvestigationSubmitted() {
        return this.investigationSubmitted
    }

    getTimeSpentSeconds() {
        return this.timeSpentSeconds
    }

    getFreeNote() {
        return this.freeNote
    }

    getUpdatedAt() {
        return this.updatedAt
    }

    getLastHudLetterAdded() {
        return this.lastHudLetterAdded
    }

}
