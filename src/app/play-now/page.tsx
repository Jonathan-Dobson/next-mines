'use client'
import React from 'react'
import Div from './game/CellParts/Div'
import Minefield from './game/Minefield'
import './game/App.css';

function PlayNow() {
  return (
    <Div App>
      <Minefield />
    </Div>
  )
}

export default PlayNow