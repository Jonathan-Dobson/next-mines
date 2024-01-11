import { SetMinefieldType, CellStateType, CellPositionType } from '@/components/game/types'

export default function rightClick(setMinefield: SetMinefieldType, newCellState: CellStateType) {
  return function (position: CellPositionType) {
    setMinefield(prev => {
      let next = [...prev]
      next[position.rownum][position.colnum].cellState = newCellState;
      return next
    })
  }
}