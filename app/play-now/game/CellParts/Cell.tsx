import Open from './Open';
import Flag from './Flag';
import Maybe from './Maybe';
import Exploded from './Exploded';
import Closed from './Closed';
import Mine from './Mine';
import { CellPositionType, CellStateType, GameStatusType } from '../types';


type CellProps = {
  position: CellPositionType,
  cell: {
    cellState: CellStateType,
    hasMine: boolean,
  }
  // gameStatus: GameStatusType,
}

function Cell(props: CellProps) {

  if (typeof props?.cell?.cellState === 'number') return (
    <Open cellState={props.cell.cellState} position={props.position} />
  )

  switch (props.cell.cellState) {
    case 'open':
      return <Open position={props.position} />
    case 'flag':
      return <Flag position={props.position} />
    case 'maybe':
      return <Maybe position={props.position} />
    case 'exploded':
      return <Exploded position={props.position} />
    case 'closed':
      return <Closed position={props.position} />
    case 'mine':
      return <Mine />
    default:
      return <Open cellState={props.cell.cellState} position={props.position} />
  }


}

export default Cell