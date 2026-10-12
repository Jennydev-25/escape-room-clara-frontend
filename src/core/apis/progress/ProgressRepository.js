import BaseRepository from "@/core/apis/base/BaseRepository";

export default class ProgressRepository extends BaseRepository {

    constructor() {
        super(import.meta.env.VITE_API_URL)
    }

    async getProgress() {
        return this.authGet('/progress')
    }

    async accumulateTime(timeData) {
        return this.authPatch('/progress/time', timeData)
    }

    async updateNote(noteData) {
        return this.authPatch('/progress/note', noteData)
    }

}
