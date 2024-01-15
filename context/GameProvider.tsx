'use client'
import { createContext, useReducer } from 'react';
import reducer from '@/app/play-now/game/reducer';
import { MinefieldType } from '@/app/play-now/game/types';

export interface GameStateType {
  minefield: MinefieldType;
  gameStatus: string;
  rowSize: number;
  colSize: number;
  totalMines: number;
}

interface ContextValue {
  state: GameStateType | undefined;
  dispatch: React.Dispatch<any>; // Replace any with the actual action type
}

const initialState = {
  minefield: [],
  gameStatus: 'on',
  rowSize: 0,
  colSize: 0,
  totalMines: 0,

};

export const GameContext = createContext<ContextValue | undefined>(undefined);

// Create a provider component
export const GameProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
};