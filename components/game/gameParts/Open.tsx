import { useContext } from 'react';
import Div from '../Div';
import { ClickTypes } from '@/components/game/types';
import { Context } from '@/context/GamePlayProvider';

type OpenProps = ClickTypes & {
  cellState?: string | number | undefined
}

export default function Open(props?: OpenProps) {
  const contextValue = useContext(Context);
  if (!contextValue) return null;

  const onClick = props?.onClick
  const onRightClick = props?.onRightClick
  const cellState = props?.cellState

  return (
    <Div Cell-Open {...{ onClick, onRightClick }}>
      <Div Cell-Number>{typeof cellState === 'number' && cellState > 0 ? cellState : ''}</Div>
    </Div>
  )
}