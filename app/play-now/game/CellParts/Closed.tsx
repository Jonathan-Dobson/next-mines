import React from 'react';
import Div from './Div';
import { CellPositionType } from '../types';
import { GameContext } from '@/context/GameProvider';
import { useContext } from 'react';

type ClosedProps = {
  position: CellPositionType
}

export default function Closed(props: ClosedProps) {
  const contextValue = useContext(GameContext)
  if (!contextValue) return (<div>contextValue is undefined</div>)
  const dispatch = contextValue.dispatch

  return (
    <Div Cell onClick={() => dispatch({
      type: 'CLICKED_ON_CLOSED_CELL',
      payload: {
        position: props.position,
      }
    })}
      onRightClick={() => dispatch({
        type: 'RIGHT_CLICKED_ON_CLOSED_CELL',
        payload: {
          position: props.position,
        }
      })}
    >
    </Div>
  )
}