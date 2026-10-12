import { puzzleHintMapper } from "@/core/mappers/puzzle/puzzle-hint-mapper";
import { puzzleMapper } from "@/core/mappers/puzzle/puzzle-mapper";
import PuzzleHintModel from "@/core/models/puzzle/PuzzleHintModel";
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

    async getHint(id, number) {
        const dto = await this.#repo.getHint(id, number)
        return PuzzleHintModel.create(dto, puzzleHintMapper)
    }

}
