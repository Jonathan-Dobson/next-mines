import Open from './Open';
import Flag from './Flag';
import Maybe from './Maybe';
import Exploded from './Exploded';
import Closed from './Closed';
import Mine from './Mine';
import { CellPositionType, CellStateType } from '../types';

type CellProps = {
  position: CellPositionType,
  cell: {
    cellState: CellStateType,
    hasMine: boolean,
  }
}

function Cell(props: CellProps) {
  const position = props.position
  if (typeof props?.cell?.cellState === 'number') return (
    <Open cellState={props.cell.cellState} position={position} />
  )

  switch (props.cell.cellState) {
    case 'open':
      return <Open position={position} />
    case 'flag':
      return <Flag position={position} />
    case 'maybe':
      return <Maybe position={position} />
    case 'exploded':
      return <Exploded position={position} />
    case 'closed':
      return <Closed position={position} />
    case 'mine':
      return <Mine />
    default:
      return <Open cellState={props.cell.cellState} position={position} />
  }
}

export default Cell