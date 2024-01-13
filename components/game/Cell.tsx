import React, { useContext } from 'react';
import Open from './gameParts/Open';
import Flag from './gameParts/Flag';
import Maybe from './gameParts/Maybe';
import Exploded from './gameParts/Exploded';
import Closed from './gameParts/Closed';
import { Context } from '@/context/GamePlayProvider';
import type { CellPositionType, CellStateType, HandleChangeType } from '@/components/game/types';

type CellProps = {
  position: CellPositionType,
  cell: {
    cellState: CellStateType,
    hasMine: boolean
  }
}

export default function Cell({ position, cell: { cellState, hasMine } }: CellProps) {
  const contextValue = useContext(Context);
  const { openIt, flagIt, maybeIt, clearIt } = contextValue

  if (!contextValue?.gameStatus) return null
  const [gameStatus, setGameStatus] = contextValue?.gameStatus

  const handleChangeTo: HandleChangeType | false = gameStatus !== 'off' && {
    open: { onClick: (() => openIt(position, setGameStatus)) },
    flag: { onRightClick: (() => flagIt(position)) },
    maybe: { onRightClick: (() => maybeIt(position)) },
    clear: { onRightClick: (() => clearIt(position)) }
  }
  if (!handleChangeTo) return null

  const parts = {
    open: <Open {...handleChangeTo.open} {...{ cellState }} />,
    flag: <Flag {...handleChangeTo.maybe} />,
    maybe: <Maybe {...handleChangeTo.clear} />,
    exploded: <Exploded />,
    closed: <Closed
      {...handleChangeTo.open}
      {...handleChangeTo.flag}
      {...{ gameStatus }}
      {...{ hasMine }}
    />
  }

  return typeof cellState === 'number'
    ? parts.open
    : parts[cellState]
}