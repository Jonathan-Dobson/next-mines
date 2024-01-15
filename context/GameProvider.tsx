'use client'
import { createContext, useReducer } from 'react';
import reducer from '@/app/play-now/game/reducer';
import { MinefieldType } from '@/app/play-now/game/types';
import generateMinefield from '@/app/play-now/game/generateMinefield'

export interface GameStateType {
  minefield: MinefieldType;
  gameStatus: string;
  rowSize: number;
  colSize: number;
  totalMines: number;
  unopenedMines: number;
}

interface ContextValue {
  state: GameStateType | undefined;
  dispatch: React.Dispatch<any>; // Replace any with the actual action type
}

const initialState = {
  gameStatus: 'on',
  rowSize: 8,
  colSize: 8,
  totalMines: 8,
  unopenedMines: 8
};

function initializer() {
  const minefield = generateMinefield(initialState.rowSize, initialState.colSize, initialState.totalMines)
  return {
    ...initialState,
    minefield
  }
}

export const GameContext = createContext<ContextValue | undefined>(undefined);

// Create a provider component
export const GameProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(reducer, initialState, initializer);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
};