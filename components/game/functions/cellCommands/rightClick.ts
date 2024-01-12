import { SetMinefieldType, CellStateType, CellPositionType } from '@/components/game/types'

export default function rightClick(setMinefield: SetMinefieldType, newCellState: CellStateType) {
  return function (position: CellPositionType) {
    setMinefield(prev => {
      let next = [...prev]
      let cell = next[position.rownum][position.colnum] || {
        cellState: 'closed',
      }
      cell.cellState = newCellState;
      return next
    })
  }
}