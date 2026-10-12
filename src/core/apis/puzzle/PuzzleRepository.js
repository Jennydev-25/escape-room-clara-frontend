import BaseRepository from "@/core/apis/base/BaseRepository";

export default class PuzzleRepository extends BaseRepository {

    constructor() {
        super(import.meta.env.VITE_API_URL)
    }

    async getPuzzle(id) {
        return this.authGet(`/puzzles/${id}`)
    }

    async getHint(id, number) {
        return this.authGet(`/puzzles/${id}/hints/${number}`)
    }

}
