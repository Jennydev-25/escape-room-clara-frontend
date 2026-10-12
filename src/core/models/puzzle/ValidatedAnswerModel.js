export default class ValidatedAnswerModel {

    constructor(correct, updatesChapter, newHudLetter, unlocks) {
        this.correct = correct
        this.updatesChapter = updatesChapter
        this.newHudLetter = newHudLetter
        this.unlocks = unlocks
    }

    isCorrect() {
        return this.correct
    }

    getUpdatesChapter() {
        return this.updatesChapter
    }

    getNewHudLetter() {
        return this.newHudLetter
    }

    getUnlocks() {
        return this.unlocks
    }

    static create(dto, mapper) {
        return new ValidatedAnswerModel(
            mapper.correct(dto),
            mapper.updatesChapter(dto),
            mapper.newHudLetter(dto),
            mapper.unlocks(dto)
        )
    }

}
