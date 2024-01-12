import React, { useContext } from 'react'
import Cell from './Cell'
import { Context } from '@/context/GamePlayProvider'

export default function Minefield() {
  const contextValue = useContext(Context);
  if (!contextValue) return <div>no context</div>
  const { minefield } = contextValue;


  return (
    <div style={{
      display: 'grid',
      gridGap: 2,
      gridTemplateColumns: `repeat(${minefield.length}, 50px)`,
      gridTemplateRows: `repeat(${minefield.length}, 50px)`
    }}>
      {minefield
        .map((row, rownum) => {
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
  )
}
