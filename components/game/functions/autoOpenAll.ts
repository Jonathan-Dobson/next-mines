import getAdjacentCellPositions from './getAdjacentCellPositions'
import isWithinLimit from './isWithinLimit'
import countAdjacent from './countAdjacent'
import { GameStatusHookType, MinefieldType } from '@/components/game/types'

type AutoOpenProps = {
  r: number,
  c: number,
  minefield: MinefieldType,
  openIt: any // TODO FIX THIS ANY TYPE
  setGame: GameStatusHookType[1] | undefined
}

export default function autoOpenAll(props: AutoOpenProps) {
  const r = props?.r
  const c = props?.c
  const minefield = props?.minefield
  const openIt = props?.openIt
  const setGame = props.setGame

  let { mines, flags } = countAdjacent(minefield, r, c)
  mines <= flags &&
    getAdjacentCellPositions(r, c)
      .forEach(([r, c]) =>
        isWithinLimit(r, c, minefield) &&
          minefield[r][c]?.cellState === 'closed' ?
          openIt({ rownum: r, colnum: c }, setGame) : false
      )
  return mines
};