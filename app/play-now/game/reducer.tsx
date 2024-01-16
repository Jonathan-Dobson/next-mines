import { ActionType } from '@/app/play-now/game/types';
import generateMinefield from './generateMinefield'
import getNeighbors from './getNeighbors';
import { GameStateType, MinefieldRowType, CellType } from '@/app/play-now/game/types';


function reducer(state: GameStateType, action: ActionType): GameStateType {
  let minefield = [...state.minefield]
  let gameStatus = state.gameStatus
  let unopenedMines = state.unopenedMines
  const max: [number, number] = [state.rowSize, state.colSize]
  const rownum = action.payload?.position?.rownum
  const colnum = action.payload?.position?.colnum

  if (action.type === 'RESET_GAME') {
    const { rows, columns, mines } = action.payload
    const minefield = generateMinefield(rows, columns, mines)
    return {
      ...state,
      minefield, gameStatus: 'on',
      rowSize: rows,
      colSize: columns,
      totalMines: mines,
      unopenedMines: mines
    }
  }
  if (action.type === 'CLOSE_MODAL') {
    return {
      ...state,
      gameStatus: 'off'
    }
  }

  function openIt(row: number, col: number) {
    if (minefield[row][col].hasMine) return
    if (minefield[row][col].cellState !== 'closed') return

    minefield[row][col].cellState = 'open'
    const neighbors = getNeighbors(row, col, max)

    let queue: [number | undefined, number | undefined][] = []

    neighbors.forEach(([r, c]: [number, number]) => {
      if (!minefield[r]) {
        return
      }
      if (!minefield[r][c]) {
        return
      }
      if (minefield[r][c].cellState === 'closed') {
        queue.push([r, c])
      }
    })

    // Only open the cell if it has no mines around it
    const mineCount = neighbors.reduce((acc: number, [r, c]: [number, number]) => {
      if (minefield[r][c].hasMine) {
        acc++
      }
      return acc
    }, 0)

    if (mineCount === 0) {
      if (queue && queue.length === 0) return
      queue.forEach(([r, c]: [number | undefined, number | undefined]) => {
        if (typeof r !== 'number' || typeof c !== 'number') return
        openIt(r, c)
      })
    }
    minefield[row][col].cellState = mineCount
  }

  function checkForWin(): boolean {
    const allMinesList = minefield.flat()
      .filter((cell: CellType) => cell.hasMine)

    const allMinesAreFlagged = allMinesList
      .every((cell: CellType) => cell.cellState === 'flag')

    const allFlags = minefield.flat()
      .filter((cell: CellType) => cell.cellState === 'flag')

    const allFlagsHaveMines = allFlags
      .every((cell: CellType) => cell.hasMine)

    const allNonMinesList = minefield.flat()
      .filter((cell: CellType) => !cell.hasMine)

    const allNonMinesOpen = allNonMinesList
      .every((cell: CellType) => cell.cellState !== 'closed')



    return (
      allMinesAreFlagged && allNonMinesOpen && allFlagsHaveMines
    )
  }

  if (gameStatus !== 'on') return state

  switch (action.type) {

    case 'CLICKED_ON_CLOSED_CELL': {
      if (typeof rownum !== 'number' || typeof colnum !== 'number') return state
      if (minefield[rownum][colnum].hasMine) {
        gameStatus = 'lost'
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
        return { ...state, minefield: minefield, gameStatus }
      }
      openIt(rownum, colnum)
      if (checkForWin()) gameStatus = 'won'
      return { ...state, minefield: minefield, gameStatus, unopenedMines }
    }

    case 'RIGHT_CLICKED_ON_CLOSED_CELL': {
      minefield[rownum][colnum].cellState = 'flag'
      if (checkForWin()) gameStatus = 'won'
      return { ...state, minefield, gameStatus, unopenedMines }
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
      const neighbors = getNeighbors(rownum, colnum, max)
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
      if (checkForWin()) gameStatus = 'won'
      return { ...state, minefield, gameStatus, unopenedMines }
    }
  }
  unopenedMines = minefield.flat()
    .filter((cell: CellType) => cell.hasMine && cell.cellState !== 'flag').length
  return { ...state, unopenedMines }
}

export default reducer






