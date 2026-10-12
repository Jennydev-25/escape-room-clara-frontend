import { puzzleSummaryMapper } from "@/core/mappers/puzzle/puzzle-summary-mapper";
import PuzzleSummaryModel from "@/core/models/puzzle/PuzzleSummaryModel";

export const folderMapper = {
    code: (dto) => dto.code,
    name: (dto) => dto.name,
    puzzles: (dto) => dto.puzzles.map((puzzle) => PuzzleSummaryModel.create(puzzle, puzzleSummaryMapper))
}
