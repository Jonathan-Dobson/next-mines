import { Dispatch, SetStateAction } from 'react';
import Minefield from './Minefield';

export type UseStateType<T> = Dispatch<SetStateAction<T>>

export type CellStateType = number | 'flag' | 'maybe' | 'exploded' | 'closed'
export type CellType = {
  hasMine: boolean,
  cellState?: CellStateType
}
export type MinefieldRowType = CellType[] | null[]
export type MinefieldType = MinefieldRowType[]
export type SetMinefieldType = UseStateType<MinefieldType>;
export type MinefieldHookType = [MinefieldType, SetMinefieldType]

export type GameStatusType = 'on' | 'off' | 'lost' | string
export type SetGameStatusType = UseStateType<GameStatusType>;
export type GameStatusHookType = [GameStatusType, SetGameStatusType]

export type CellPositionType = {
  rownum: number,
  colnum: number
}

export type ChangeToType = {
  open?: { onClick: () => void },
  flag?: { onRightClick: () => void | undefined | string },
  maybe?: { onRightClick: () => void | undefined | string },
  clear?: { onRightClick: () => void | undefined | string }
}

export type ClickTypes = {
  onClick?: () => void | undefined,
  onRightClick?: () => string | void | undefined,
}

export type ContextValueType = {
  gameStatus?: GameStatusHookType,
  settings?: {
    size?: [number, UseStateType<number>],
    mines?: [number, UseStateType<number>]
  },
  minefield: MinefieldType,
  setMinefield?: SetMinefieldType,
  [key: string]: any
}


export type CellPropsType = {
  position: CellPositionType,
  state: CellStateType,
  changeTo: ChangeToType,
  onClick?: () => void | undefined,
  onRightClick?: () => string | void | undefined,
}
