'use client'
import { useState, createContext, PropsWithChildren } from 'react';
import cellCommands from '@/components/game/functions/cellCommands/bundled'
import type { ContextValueType, SetMinefieldType, MinefieldHookType, MinefieldType } from '@/components/game/types'

const GAME_SIZE = 10
const MINE_COUNT = 3

const initialMinefield: MinefieldType = [[]]

const initialContext: ContextValueType = {
  minefield: initialMinefield,
}

export const Context = createContext<ContextValueType>(initialContext)

export default function SettingsProvider(props: PropsWithChildren<{}>) {
  const [minefield, setMinefield]: MinefieldHookType = useState([...initialMinefield])

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