import React, { useContext } from 'react'
import Cell from './CellParts/Cell'
import { MinefieldRowType } from './types'
import { GameContext } from '@/context/GameProvider'
import Div from './CellParts/Div'
import { Play } from 'next/font/google'

export default function Minefield() {
  const contextValue = useContext(GameContext)
  if (!contextValue) return (<div>contextValue is undefined</div>)
  const state = contextValue.state
  const dispatch = contextValue.dispatch
  const minefield = state?.minefield || []

  const PlayAgainButton = () => {
    return (
      <button onClick={() => dispatch({
        type: 'RESET_GAME',
        payload: {
          rows: 8,
          columns: 8,
          mines: 8
        }
      })}>
        {state?.gameStatus === 'on' ? 'Reset' : 'Play Again'}
      </button>
    )
  }

  return (<div>

    <Div >
      <Div GameOver>
        {state?.gameStatus === 'lost' &&
          <>
            <Div GameOverText>Ouch! You hit a mine!<br />Game Over <br />     <button onClick={() => dispatch({
              type: 'CLOSE_MODAL',
            })}>
              OK
            </button>
              <PlayAgainButton />
            </Div>
          </>
        }
        {state?.gameStatus === 'won' &&
          <>
            <Div GameOverText>Congratulations! You Won!<br />All mines have been correctly flagged.
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

          </>}
      </Div>
    </Div>

    <PlayAgainButton />

    {/* <button onClick={() => dispatch({
      type: 'RESET_GAME',
      payload: {
        rows: 8,
        columns: 8,
        mines: 8
      }
    })}>
      {state?.gameStatus === 'on' ? 'Reset' : 'Play Again'}
    </button> */}


    <div>
      <p>{state?.unopenedMines}</p>
    </div>

    <div style={{
      display: 'grid',
      gridGap: 2,
      gridTemplateColumns: `repeat(${minefield.length}, 50px)`,
      gridTemplateRows: `repeat(${minefield.length}, 50px)`
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
  </div>
  )
}
