import { ActionType } from '@/app/play-now/game/types';
import generateMinefield from './generateMinefield'
import getNeighbors from './getNeighbors';
import { MinefieldType } from '@/app/play-now/game/types';
import { GameStateType } from '@/context/GameProvider';

// minefield class with getter and setter

class Minefield {
  private _minefield: any
  constructor(minefield: any) {
    this._minefield = minefield
  }
  get minefield() {
    return this._minefield
  }
  set minefield(minefield: any) {
    this._minefield = minefield
  }
}

function reducer(state: GameStateType, action: ActionType) {
  var minefield = new Minefield(state.minefield)

  function openIt(row: number, col: number) {
    if (minefield.minefield[row][col].hasMine) return
    if (minefield.minefield[row][col].cellState !== 'closed') return

    minefield.minefield[row][col].cellState = 'open'
    const neighbors = getNeighbors(row, col)

    // build a queue of neighbors to open in an array, then open them all at once in a loop
    let queue = [[]]

    neighbors.forEach((neighbor: any) => {
      const [r, c] = neighbor
      if (!minefield.minefield[r]) {
        return
      }
      if (!minefield.minefield[r][c]) {
        return
      }
      if (r >= 0 && r < minefield.minefield.length && c >= 0 && c < minefield.minefield[0].length) {
        if (minefield.minefield[r][c].cellState === 'closed') {
          queue.push(neighbor)
        }
      }
    })

    const mineCount = neighbors.reduce((acc: number, neighbor: any) => {
      const [r, c] = neighbor
      if (r >= 0 && r < minefield.minefield.length && c >= 0 && c < minefield.minefield[0].length) {
        if (minefield.minefield[r][c].hasMine) {
          acc++
        }
      }
      return acc
    }, 0)

    if (mineCount === 0) {
      queue.forEach((neighbor: any) => {
        const [r, c] = neighbor
        if (r >= 0 && r < minefield.minefield.length && c >= 0 && c < minefield.minefield[0].length) {
          openIt(r, c)
        }
      })
    }

    minefield.minefield[row][col].cellState = mineCount

  }

  function checkForWin(minefield: MinefieldType): boolean {
    const allMinesList = minefield.flat()
      .filter((cell: any) => cell.hasMine)

    const allMinesAreFlagged = allMinesList
      .every((cell: any) => cell.cellState === 'flag')

    const allFlags = minefield.flat()
      .filter((cell: any) => cell.cellState === 'flag')

    const allFlagsHaveMines = allFlags
      .every((cell: any) => cell.hasMine)

    const allNonMinesList = minefield.flat()
      .filter((cell: any) => !cell.hasMine)

    const allNonMinesOpen = allNonMinesList
      .every((cell: any) => cell.cellState !== 'closed')



    return (
      allMinesAreFlagged && allNonMinesOpen && allFlagsHaveMines
    )
  }

  switch (action.type) {
    case 'RESET_GAME': {
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
    case 'CLICKED_ON_CLOSED_CELL': {
      let gameStatus = state.gameStatus
      if (gameStatus !== 'on') return state
      const { position } = action.payload
      const { rownum, colnum } = position
      if (typeof rownum !== 'number' || typeof colnum !== 'number') return state

      // when game is lost
      if (minefield.minefield[rownum][colnum].hasMine) {
        gameStatus = 'lost'
        // show all mines.
        minefield.minefield = minefield.minefield.map((row: any) => {
          return row.map((cell: any) => {
            if (cell.hasMine) {
              cell.cellState = 'mine'
            }
            return cell
          })
        })
        minefield.minefield[rownum][colnum].cellState = 'exploded'
        return { ...state, minefield: minefield.minefield, gameStatus }
      }

      openIt(rownum, colnum)

      if (checkForWin(minefield.minefield)) {
        gameStatus = 'won'
      }

      const unopenedMines = minefield.minefield.flat()
        .filter((cell: any) => cell.hasMine && cell.cellState !== 'flag').length


      return { ...state, minefield: minefield.minefield, gameStatus, unopenedMines }
    }
    case 'RIGHT_CLICKED_ON_CLOSED_CELL': {
      let gameStatus = state.gameStatus
      if (gameStatus === 'off') return state
      const minefield = state.minefield
      if (!minefield) return state
      const { position } = action.payload
      const { rownum, colnum } = position
      if (!minefield[rownum]) return state
      if (!minefield[rownum][colnum]) return state
      let cell = minefield[rownum][colnum]
      if (!cell) return state
      cell.cellState = 'flag'
      minefield[rownum][colnum] = cell
      if (checkForWin(minefield)) {
        gameStatus = 'won'
      }
      const unopenedMines = minefield.flat()
        .filter((cell: any) => cell.hasMine && cell.cellState !== 'flag').length
      return { ...state, minefield, gameStatus, unopenedMines }
    }
    case 'RIGHT_CLICKED_ON_FLAG_CELL': {
      let gameStatus = state.gameStatus
      if (gameStatus !== 'on') return state
      const { position } = action.payload
      const { rownum, colnum } = position
      const minefield = [...state.minefield]
      const cell = minefield[rownum][colnum]
      if (!cell) return state
      cell.cellState = 'maybe' || null
      minefield[rownum][colnum] = cell
      const unopenedMines = minefield.flat()
        .filter((cell: any) => cell.hasMine && cell.cellState !== 'flag').length
      return { ...state, minefield, unopenedMines }
    }
    case 'RIGHT_CLICKED_ON_MAYBE_CELL': {
      let gameStatus = state.gameStatus
      if (gameStatus !== 'on') return state
      const { position } = action.payload
      const { rownum, colnum } = position
      const minefield = [...state.minefield]
      const cell = minefield[rownum][colnum]
      if (!cell) return state
      cell.cellState = 'closed'
      minefield[rownum][colnum] = cell
      const unopenedMines = minefield.flat()
        .filter((cell: any) => cell.hasMine && cell.cellState !== 'flag').length
      return { ...state, minefield, unopenedMines }
    }
    case 'CLICKED_ON_OPEN_CELL': {
      let gameStatus = state.gameStatus
      if (gameStatus !== 'on') return state
      const { position } = action.payload
      const { rownum, colnum } = position
      const minefield = [...state.minefield]
      const cell = minefield[rownum][colnum]

      const neighbors = getNeighbors(rownum, colnum)
      let flaggedNeighbors = 0
      neighbors.forEach((neighbor: any) => {
        const [r, c] = neighbor
        if (neighbors.length === 0) return
        if (r >= 0 && r < minefield.length && c >= 0 && c < minefield[0].length) {
          if (minefield[r][c]?.cellState === 'flag') {
            flaggedNeighbors++
          }
        }
      })
      if (flaggedNeighbors !== cell?.cellState) return state

      neighbors.forEach((neighbor: any) => {
        const [r, c] = neighbor
        if (r >= 0 && r < minefield.length && c >= 0 && c < minefield[0].length) {

          if (minefield[r][c]?.cellState === 'closed') {
            openIt(r, c)
          }
        }

      })

      minefield[rownum][colnum] = cell

      if (checkForWin(minefield)) {
        gameStatus = 'won'
      }
      const unopenedMines = minefield.flat()
        .filter((cell: any) => cell.hasMine && cell.cellState !== 'flag').length
      return { ...state, minefield, gameStatus, unopenedMines }
    }

    case 'CLOSE_MODAL': {
      return { ...state, gameStatus: 'off' }
    }
    default: {
      return state
    }
  }
}

export default reducer






