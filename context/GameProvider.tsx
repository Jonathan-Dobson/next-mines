'use client'
import { createContext, useReducer } from 'react';
import reducer from '@/app/play-now/game/reducer';
import { GameStateType } from '@/app/play-now/game/types';
import generateMinefield from '@/app/play-now/game/generateMinefield'

interface ContextValue {
  state: GameStateType | undefined;
  dispatch: React.Dispatch<any>; // Replace any with the actual action type
}

const initialState: GameStateType = {
  minefield: [],
  gameStatus: 'on',
  rowSize: 8,
  colSize: 8,
  totalMines: 8,
  unopenedMines: 8,
  startTime: Date.now(),
  endTime: 0,
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