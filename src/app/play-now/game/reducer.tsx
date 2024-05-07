import { ActionType } from '@/app/play-now/game/types';
import generateMinefield from './generateMinefield'
import getNeighbors from './getNeighbors';
import { GameStateType, MinefieldRowType, CellType } from '@/app/play-now/game/types';


function reducer(state: GameStateType, action: ActionType): GameStateType {
  let minefield = [...state.minefield]
  let gameStatus = state.gameStatus
  let unopenedMines = state.unopenedMines
  const size: [number, number] = [state.rowSize, state.colSize]
  const rownum = action.payload?.position?.rownum
  const colnum = action.payload?.position?.colnum
  let endTime = state.endTime



  if (action.type === 'RESET_GAME') {
    const { rows, columns, mines, time } = action.payload
    const minefield = generateMinefield(rows, columns, mines)
    return {
      ...state,
      minefield,
      gameStatus: 'on',
      rowSize: rows,
      colSize: columns,
      totalMines: mines,
      unopenedMines: mines,
      startTime: time,
      endTime: 0,
    }
  }
  if (action.type === 'INCREMENT_TIMER') {
    if (checkForWin()) {
      gameStatus = 'won'
    }
    return {
      ...state,
      gameStatus,
      endTime: Date.now()
    }
  }
  if (action.type === 'CLOSE_MODAL') {
    return {
      ...state,
      gameStatus: 'off'
    }
  }

  function openIt(row: number, col: number) {
    minefield[row][col].cellState = 'open'
    const neighbors = getNeighbors(row, col, size)
    var queue: [number, number][] = []

    minefield[row][col].cellState = neighbors.reduce((acc: number, [r, c]: [number, number]) => {
      if (minefield[r][c].cellState === 'closed') {
        queue = queue.length && typeof queue[0][0] === 'number' ? [...queue, [r, c]] : [[r, c]]
      }
      return minefield[r][c].hasMine ? acc + 1 : acc
    }, 0)

    if (minefield[row][col].cellState === 0 && queue && queue.length > 0) {
      queue.forEach(([r, c]: [number, number]) => {
        openIt(r, c)
      })
    }
  }

  function checkForWin(): boolean {
    const allMinesAreFlagged = minefield.flat()
      .filter((cell) => cell.hasMine)
      .every((cell) => cell.cellState === 'flag')

    const allFlagsHaveMines = minefield.flat()
      .filter((cell) => cell.cellState === 'flag')
      .every((cell) => cell.hasMine)

    const allNonMinesOpen = minefield.flat()
      .filter((cell) => !cell.hasMine)
      .every((cell) => cell.cellState !== 'closed')

    return (
      allMinesAreFlagged && allNonMinesOpen && allFlagsHaveMines
    )
  }

  if (gameStatus !== 'on') return state
  state.endTime = Date.now()
  switch (action.type) {

    case 'CLICKED_ON_CLOSED_CELL': {
      if (typeof rownum !== 'number' || typeof colnum !== 'number') return state
      if (minefield[rownum][colnum].hasMine) {
        gameStatus = 'lost'
        endTime = Date.now()
        minefield = minefield.map((row: MinefieldRowType) => {
          if (!row.length) return []
          return row.map((value: CellType) => {
            if (value.hasMine) {
              value.cellState = 'mine'
            }
            return value
          })
        })
        minefield[rownum][colnum].cellState = 'exploded'
        return { ...state, minefield, gameStatus, endTime }
      }
      openIt(rownum, colnum)
      if (checkForWin()) {
        gameStatus = 'won'
        endTime = Date.now()
      }
      return { ...state, minefield, gameStatus, unopenedMines, endTime }
    }

    case 'RIGHT_CLICKED_ON_CLOSED_CELL': {
      minefield[rownum][colnum].cellState = 'flag'
      if (checkForWin()) {
        gameStatus = 'won'
        endTime = Date.now()
      }
      return { ...state, minefield, gameStatus, unopenedMines, endTime }
    }

    case 'RIGHT_CLICKED_ON_FLAG_CELL': {
      minefield[rownum][colnum].cellState = 'maybe'
      return { ...state, minefield, unopenedMines }
    }

    case 'RIGHT_CLICKED_ON_MAYBE_CELL': {
      minefield[rownum][colnum].cellState = 'closed'
      return { ...state, minefield, unopenedMines }
    }

    case 'CLICKED_ON_OPEN_CELL': {
      const neighbors = getNeighbors(rownum, colnum, size)
      let flaggedNeighbors = 0
      neighbors.forEach(([r, c]: [number, number]) => {
        if (minefield[r][c]?.cellState === 'flag') {
          flaggedNeighbors++
        }
      })
      if (flaggedNeighbors !== minefield[rownum][colnum]?.cellState) return state
      neighbors.forEach(([r, c]: [number, number]) => {
        if (minefield[r][c]?.cellState === 'closed') {
          openIt(r, c)
        }
      })
      if (checkForWin()) {
        gameStatus = 'won'
        endTime = Date.now()
      }
      return { ...state, minefield, gameStatus, unopenedMines, endTime }
    }
  }
  unopenedMines = minefield.flat()
    .filter((cell) => cell.hasMine && cell.cellState !== 'flag').length
  return { ...state, unopenedMines }
}

export default reducer






