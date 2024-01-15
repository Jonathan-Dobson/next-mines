import Div from './Div';
import { ClickTypes, GameStatusType, CellPositionType } from '../types';
import { GameContext } from '@/context/GameProvider';
import { useContext } from 'react';


type Props = ClickTypes & {
  cellState?: string | number | undefined
  position: CellPositionType
}

export default function Open(props?: Props) {
  const contextValue = useContext(GameContext)
  if (!contextValue) return (<div>contextValue is undefined</div>)
  const dispatch = contextValue.dispatch

  const onClick = props?.onClick
  const onRightClick = props?.onRightClick
  const cellState = props?.cellState

  return (
    <Div Cell-Open onClick={() => dispatch({
      type: 'CLICKED_ON_OPEN_CELL',
      payload: {
        position: props?.position,
      }
    })}>
      <Div Cell-Number>{typeof cellState === 'number' && cellState > 0 ? cellState : ''}</Div>
    </Div>
  )
}