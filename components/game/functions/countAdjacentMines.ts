import isWithinLimit from './isWithinLimit'
import getAdjacentCellPositions from './getAdjacentCellPositions'
import { MinefieldType } from '@/components/game/types'


export default function countAdjacentMines(minefield: MinefieldType, r: number, c: number) {
  return getAdjacentCellPositions(r, c)
    .reduce((acc, [r, c]) => {
      if (isWithinLimit(r, c, minefield)) {
        return acc + (minefield[r][c]?.hasMine
          ? 1
          : 0)
      }
      return acc
    }, 0)
}