import React, { useContext, useState, useEffect } from 'react';
import Div from './Div'
import { Context } from '@/context/GamePlayProvider'
import generateMinefield from './functions/generateMinefield'

export default function ControlPanel() {
  const [gameOverAlert, setGameOverAlert] = useState(false)
  const contextValue = useContext(Context)
  const gameStatusHook = contextValue.gameStatus
  const [gameStatus, setGameStatus] = gameStatusHook || []

  useEffect(() => {
    if (gameStatus === 'on') {
      setGameOverAlert(false)
    }
    // if (gameStatus === 'lost') {
    //   setGameOverAlert(false)
    // }
  }, [gameStatus]
  )

  if (!contextValue) return null

  const settings = contextValue.settings || {}
  if (!settings) return null
  const size = settings?.size ? settings.size[0] : 0
  const mines = settings?.mines ? settings.mines[0] : 0
  const setMinefield = contextValue.setMinefield

  function handleStart() {
    setGameOverAlert(false)
    setMinefield && setMinefield(generateMinefield({ size, mines }))
    setGameStatus && setGameStatus("on")
  }


  return (
    <div style={{ margin: 6 }}>
      <Div >
        {gameOverAlert &&
          <>
            <Div GameOverText>Ouch! You hit a mine!<br />Game Over <br /> <button onClick={handleStart}>
              {gameStatus === 'off' ? 'Start' : gameStatus === 'on' ? 'Start Over' : 'Play Again'}
            </button></Div>
          </>
        }
      </Div>

      <div style={{ display: 'flex', justifyContent: 'space-evenly', color: '#eee' }}>
        <div> Time: 00:00 </div> &nbsp;
        <div> Mines: {1}/{1} </div> &nbsp;
        <button onClick={handleStart}>
          {gameStatus === 'off' ? 'Start' : gameStatus === 'on' ? 'Start Over' : 'Play Again'}
        </button>
      </div>
      {/* <button onClick={()=>startGame({size:8,mines:TotalMines})}>{startText}</button> */}
      {/* <button>Change Difficulty</button> */}
      {/* <button>Pause</button> */}
    </div>
  )
}