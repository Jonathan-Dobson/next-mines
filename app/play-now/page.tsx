'use client'
import React from 'react'
import Div from './game/CellParts/Div'
import ControlPanel from './game/ControlPanel'
import Minefield from './game/Minefield'
import './game/App.css';

function PlayNow() {
  return (
    <Div App>
      {/* <ControlPanel /> */}
      <Minefield />
    </Div>
  )
}

export default PlayNow