import isWithinLimit from './isWithinLimit'
import getAdjacentCellPositions from './getAdjacentCellPositions'

export default function countAdjacentMines(minefield: any[], r: number, c: number) {
  return getAdjacentCellPositions(r, c)
    .reduce((acc, [r, c]) => {
      if (isWithinLimit(r, c, minefield)) {
        return acc + (minefield[r][c].hasMine
          ? 1
          : 0)
      }
      return acc
    }, 0)
}