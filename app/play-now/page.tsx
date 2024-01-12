'use client'
import React from 'react'
import Div from '@/components/game/Div'
import ControlPanel from '@/components/game/ControlPanel'
import Minefield from '@/components/game/Minefield'
import '@/components/game/App.css';

function PlayNow() {
  return (
    <Div App>
      <ControlPanel />
      <Minefield />
    </Div>
  )
}

export default PlayNow