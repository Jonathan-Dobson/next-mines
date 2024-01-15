import React, { useContext } from 'react'
import Cell from './CellParts/Cell'
import { MinefieldRowType } from './types'
import { GameContext } from '@/context/GameProvider'

export default function Minefield() {
  const contextValue = useContext(GameContext)
  if (!contextValue) return (<div>contextValue is undefined</div>)
  const state = contextValue.state
  const dispatch = contextValue.dispatch

  const minefield = state?.minefield || []

  console.log(state?.gameStatus);

  return (<div>

    <button onClick={() => dispatch({
      type: 'RESET_GAME',
      payload: {
        rows: 5,
        columns: 5,
        mines: 3
      }
    })}>Reset</button>

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
