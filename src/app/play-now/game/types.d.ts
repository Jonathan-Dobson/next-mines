import { Dispatch, SetStateAction } from 'react';
import Minefield from './Minefield';

export type ActionType = {
  type:
  'CLICKED_ON_OPEN_CELL' |
  'CLICKED_ON_CLOSED_CELL' |
  'RIGHT_CLICKED_ON_CLOSED_CELL' |
  'RIGHT_CLICKED_ON_FLAG_CELL' |
  'RIGHT_CLICKED_ON_MAYBE_CELL' |
  'RESET_GAME' |
  'SET_GAME_STATUS' |
  'CLOSE_MODAL' |
  'INCREMENT_TIMER'
  payload?: any
}

export interface GameStateType {
  minefield: MinefieldType;
  gameStatus: GameStatusType;
  rowSize: number;
  colSize: number;
  totalMines: number;
  unopenedMines: number;
  startTime: number;
  endTime: number;
}

export type UseStateType<T> = Dispatch<SetStateAction<T>>
export type UseReducerType<T> = [T, Dispatch<SetStateAction<T>>]

export type CellStateType = number | 'open' | 'flag' | 'maybe' | 'exploded' | 'closed' | 'opening' | 'mine'
export type CellType = {
  hasMine: boolean,
  cellState?: CellStateType
}
export type MinefieldRowType = CellType[]
export type MinefieldType = MinefieldRowType[]
export type SetMinefieldType = UseStateType<MinefieldType>;
export type MinefieldHookType = [MinefieldType, SetMinefieldType]

export type GameStatusType = 'on' | 'off' | 'lost' | 'won'
export type SetGameStatusType = UseStateType<GameStatusType>;
export type GameStatusHookType = [GameStatusType, SetGameStatusType]

export type CellPositionType = {
  rownum: number,
  colnum: number
}

export type ResetGamePayloadType = {
  rowSize: number,
  colSize: number,
  totalMines: number
}