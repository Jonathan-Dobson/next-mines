import React, { useContext } from 'react';
import Open from './gameParts/Open';
import Flag from './gameParts/Flag';
import Maybe from './gameParts/Maybe';
import Exploded from './gameParts/Exploded';
import Closed from './gameParts/Closed';
import { Context } from '@/context/GamePlayProvider';
import type { CellPositionType, CellStateType, ChangeToType } from '@/components/game/types';

export type CellPropsType = {
  position: CellPositionType,
  cell: {
    cellState: CellStateType,
    hasMine: boolean
  }
}

export default function Cell({ position, cell: { cellState, hasMine } }: CellPropsType) {
  const contextValue = useContext(Context);

  // if (!contextValue) return null;

  const { openIt, flagIt, maybeIt, clearIt,
  } = contextValue

  if (!contextValue?.gameStatus) {
    return <div>no game status</div>
  }

  const [gameStatus, setGameStatus] = contextValue?.gameStatus

  console.log('gameStatus', gameStatus);

  const changeTo: ChangeToType | false = gameStatus !== 'off' && {
    open: { onClick: (() => openIt(position, setGameStatus)) },
    flag: { onRightClick: (() => flagIt(position)) },
    maybe: { onRightClick: (() => maybeIt(position)) },
    clear: { onRightClick: (() => clearIt(position)) }
  }

  if (!changeTo) return null

  const parts = {
    open: <Open {...changeTo.open} {...{ cellState }} />,
    flag: <Flag {...changeTo.maybe} />,
    maybe: <Maybe {...changeTo.clear} />,
    exploded: <Exploded />,
    closed: <Closed
      {...changeTo.open}
      {...changeTo.flag}
      {...{ gameStatus }}
      {...{ hasMine }}
    />
  }

  console.log('cellState', cellState);

  return typeof cellState === 'number'
    ? parts.open
    : parts[cellState]
}