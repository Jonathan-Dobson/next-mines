import React from 'react';
import Div from './Div';
import Mine from './Mine';
import { ClickTypes, GameStatusType, CellPositionType } from '../types';
import { GameContext } from '@/context/GameProvider';
import { useContext } from 'react';

type ClosedProps = ClickTypes & {
  // gameStatus: GameStatusType,
  // hasMine: boolean,
  position: CellPositionType
}

export default function Closed(props: ClosedProps) {
  const contextValue = useContext(GameContext)
  if (!contextValue) return (<div>contextValue is undefined</div>)
  const dispatch = contextValue.dispatch

  // const gameStatus = props?.gameStatus || 'off'
  // const onClick = gameStatus === 'lost' ? () => { } : props?.onClick
  // const onRightClick = gameStatus === 'lost' ? () => { } : props?.onRightClick
  // const hasMine = props?.hasMine

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
      {/* <Mine /> */}
    </Div>
    // <Div Cell {...{ onClick, onRightClick }}>
    //   {gameStatus === 'lost' && hasMine && <Mine />}
    // </Div>
  )
}