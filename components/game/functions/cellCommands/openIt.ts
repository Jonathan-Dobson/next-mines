import autoOpenAll from '../autoOpenAll'
import type { SetMinefieldType, GameStatusHookType, CellPositionType } from '@/components/game/types.d.ts';

export default function openIt(setMinefield: SetMinefieldType) {


  return function ({ rownum: r, colnum: c }: CellPositionType, setGame?: GameStatusHookType[1]) {
    console.log('openIt', r, c)

    setMinefield((prev: any[]) => {
      let minefield = [...prev]
      let { cellState, hasMine } = minefield[r][c]
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

