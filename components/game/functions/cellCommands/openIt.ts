import autoOpenAll from '../autoOpenAll'
import type {
  SetMinefieldType, CellPositionType, SetGameStatusType
} from '@/components/game/types.d.ts';

export default function openIt(setMinefield: SetMinefieldType) {
  return function ({ rownum: r, colnum: c }: CellPositionType, setGame?: SetGameStatusType) {
    setMinefield((prev) => {
      let minefield = [...prev]
      let cellState = minefield[r][c]?.cellState || 'closed'
      const hasMine = minefield[r][c]?.hasMine || false
      if (cellState !== 'flag') {
        hasMine && setGame && setGame('lost')
        cellState = hasMine
          ? 'exploded'
          : autoOpenAll({ r, c, minefield, openIt: openIt(setMinefield), setGame })
      }
      minefield[r][c] = { hasMine, cellState }
      return minefield
    })
  }
}

