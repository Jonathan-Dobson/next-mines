'use client'
import { useState, Dispatch, createContext, PropsWithChildren, SetStateAction } from 'react';
import cellCommands from '@/components/game/functions/cellCommands/bundled'
import type { ContextValueType } from '@/components/game/types'

const GAME_SIZE = 10
const MINE_COUNT = 9

// use game size to create an empty minefield
const initialMinefield = [[]]

const initialContext: ContextValueType = {
  minefield: initialMinefield,
}

export const Context = createContext<ContextValueType>(initialContext)

export default function SettingsProvider(props: PropsWithChildren<{}>) {
  let [minefield, setMinefield] = useState([...initialMinefield])
  const value: ContextValueType = {
    gameStatus: useState('off'),
    settings: {
      size: useState(GAME_SIZE),
      mines: useState(MINE_COUNT)
    },
    minefield,
    setMinefield,
    ...cellCommands(setMinefield),
  }

  return (
    <Context.Provider value={value}>
      {props.children}
    </Context.Provider>
  )
}