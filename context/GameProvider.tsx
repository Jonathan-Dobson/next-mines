'use client'
import { createContext, useReducer } from 'react';
import reducer from '@/app/play-now/game/reducer';
import { MinefieldType } from '@/app/play-now/game/types';

interface State {
  minefield: MinefieldType;
  gameStatus: string;
}

interface ContextValue {
  state: State | undefined;
  dispatch: React.Dispatch<any>; // Replace any with the actual action type
}

const initialState = {
  minefield: [],
  gameStatus: 'on',
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