import { Dispatch, SetStateAction } from 'react';

export type UseStateType<T> = Dispatch<SetStateAction<T>>

export type SetMinefieldType = UseStateType<any[]>;

export type GameStatusType = 'on' | 'off' | 'lost' | string

export type GameStatusHookType = [GameStatusType, UseStateType<GameStatusType>]

export type CellPositionType = {
  rownum: number,
  colnum: number
}

export type CellStateType = number | 'flag' | 'maybe' | 'exploded' | 'closed'

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
  minefield: any[],
  setMinefield?: UseStateType<any[]>,
  [key: string]: any
}