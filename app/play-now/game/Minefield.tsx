'use client'
import React, { use, useContext, useEffect } from 'react'
import Cell from './CellParts/Cell'
import { MinefieldRowType, ActionType } from './types'
import { GameContext } from '@/context/GameProvider'
import Div from './CellParts/Div'
import { time } from 'console'

const colors = {
  'on': 'pink',
  'off': 'red',
  'lost': 'red',
  'won': 'green'
}

export default function Minefield() {
  const contextValue = useContext(GameContext)
  useEffect(() => {
    if (contextValue?.state?.gameStatus === 'on') {
      const interval = setInterval(() => {
        contextValue.dispatch({
          type: 'INCREMENT_TIMER',
        })
      }, 500)
      return () => clearInterval(interval)
    }
  }, [contextValue])
  if (!contextValue) return (<div>contextValue is undefined</div>)
  const state = contextValue.state
  if (!state) return (<div>state is undefined</div>)
  const gameStatus = state.gameStatus
  const dispatch: React.Dispatch<ActionType> = contextValue.dispatch
  const minefield = state?.minefield || []
  const totalMines = state?.totalMines || 0



  const PlayAgainButton = () => {
    return (
      <button onClick={() => dispatch({
        type: 'RESET_GAME',
        payload: {
          rows: 8,
          columns: 8,
          mines: 10,
          time: Date.now()
        }
      })}>
        {gameStatus === 'on' ? 'Reset' : 'Play Again'}
      </button>
    )
  }

  const flaggedTiles = minefield.flat()
    .filter((cell: any) => cell.cellState === 'flag').length || 0

  const minesToFlag = totalMines - flaggedTiles

  return (<div style={{
    display: 'flex',
    flexDirection: 'column',
  }}>

    <Div >
      <Div GameOver>
        {gameStatus === 'lost' &&
          <>
            <Div GameOverText>Ouch! You hit a mine!<br />Game Over <br />
              <button onClick={() => dispatch({
                type: 'CLOSE_MODAL',
              })}>
                OK
              </button>
              <PlayAgainButton />
            </Div>
          </>
        }
        {/* {gameStatus === 'won' &&
          <>
            <Div GameOverText style={{ color: 'green' }}>Congratulations! You Won!<br />All mines have been correctly flagged.
              <div>

                <button onClick={() => dispatch({
                  type: 'CLOSE_MODAL',
                })}>
                  OK
                </button>
              </div>
              <div>

                <PlayAgainButton />
              </div>
            </Div>

          </>} */}
      </Div>
    </Div>

    <PlayAgainButton />


    <div>
      <p style={{ color: colors[state.gameStatus], fontSize: '16pt' }}>
        {
          minesToFlag <= 0 ? 'All flagged. ' : minesToFlag + ' more to flag. '
        }
        {gameStatus === 'off' && 'Game Over'}
        {gameStatus === 'lost' && 'Game Over'}
        {gameStatus === 'won' && 'You Win!'}
      </p>
    </div>

    <div style={{
      display: 'grid',
      gridGap: 2,
      gridTemplateColumns: `repeat(${minefield.length}, 50px)`,
      gridTemplateRows: `repeat(${minefield.length}, 50px)`,
      backgroundColor: colors[gameStatus],
      border: `6px solid ${colors[gameStatus]}`
    }}>

      {!minefield || minefield.length === 0 ? 'no minefield' :
        minefield
          .map((row: MinefieldRowType, rownum: number) => {
            return row.map((cell: any, colnum: number) => {
              return <Cell key={`${rownum.toString()}-${colnum.toString()}`}
                position={{ colnum, rownum }}
                cell={cell}
              />
            }
            )
          }
          )
      }
    </div>
    <div>
      Time {
        state.startTime && state.endTime && state.endTime > state.startTime &&
        <span>{((state.endTime - state.startTime) / 1000).toFixed(0)}</span>
      }

    </div>
  </div>
  )
}
