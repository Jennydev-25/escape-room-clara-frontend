import { puzzleMapper } from "@/core/mappers/puzzle/puzzle-mapper";
import PuzzleModel from "@/core/models/puzzle/PuzzleModel";

export default class PuzzleService {

    #repo

    constructor(repository) {
        this.#repo = repository
    }

    async getPuzzle(id) {
        const dto = await this.#repo.getPuzzle(id)
        return PuzzleModel.create(dto, puzzleMapper)
    }

}
