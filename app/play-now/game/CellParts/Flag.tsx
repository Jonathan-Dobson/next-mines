import React from 'react'
import Div from './Div'
import { CellPositionType } from '@/app/play-now/game/types'
import { GameContext } from '@/context/GameProvider';
import { useContext } from 'react';

type Props = {
  cellState?: string | number | undefined
  position?: CellPositionType
}

const Flag = (props?: Props) => {
  const contextValue = useContext(GameContext)
  if (!contextValue) return (<div>contextValue is undefined</div>)
  const dispatch = contextValue.dispatch

  return (
    <Div Cell
      onRightClick={() => dispatch({
        type: 'RIGHT_CLICKED_ON_FLAG_CELL',
        payload: {
          position: props?.position,
        }
      })}
    >
      <div className="Flag-Container">
        <div className="Flag-Pole"></div>
        <div className="Flag-Area">
          <div className="Flag-Triangle"></div>
          <div className="Flag-Maybe"><b></b></div>
        </div>
      </div>
    </Div>
  )
}

export default Flag