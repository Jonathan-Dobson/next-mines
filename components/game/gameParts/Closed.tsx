import React from 'react';
import Div from '../Div';
import Mine from './Mine';
import { ClickTypes, GameStatusType } from '../types';

type ClosedProps = ClickTypes & {
  gameStatus: GameStatusType,
  hasMine: boolean
}

export default function Closed(props: ClosedProps) {
  const gameStatus = props?.gameStatus || 'off'
  const onClick = gameStatus === 'lost' ? () => { } : props?.onClick
  const onRightClick = gameStatus === 'lost' ? () => { } : props?.onRightClick
  const hasMine = props?.hasMine

  return (
    <Div Cell {...{ onClick, onRightClick }}>
      {gameStatus === 'lost' && hasMine && <Mine />}
    </Div>
  )
}