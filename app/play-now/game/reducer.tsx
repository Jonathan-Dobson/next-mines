import { ActionType } from '@/app/play-now/game/types';
import generateMinefield from './generateMinefield'
import getNeighbors from './getNeighbors';

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


function reducer(state: any, action: ActionType) {
  console.log('action', action);
  var minefield = new Minefield(state.minefield)

  function openIt(row: number, col: number) {
    console.count('openIt count')
    console.log('opening', row, col);
    if (minefield.minefield[row][col].hasMine) return
    if (minefield.minefield[row][col].cellState !== 'closed') return

    minefield.minefield[row][col].cellState = 'open'
    const neighbors = getNeighbors(row, col)
    let mineCount = 0

    // build a queue of neighbors to open in an array, then open them all at once in a loop
    let queue = [[]]
    neighbors.forEach((neighbor: any) => {
      const [r, c] = neighbor
      if (!minefield.minefield[r]) {
        console.log('no cell', r, c);
        return
      }
      if (!minefield.minefield[r][c]) {
        console.log('no cell', r, c);
        return
      }
      if (r >= 0 && r < minefield.minefield.length && c >= 0 && c < minefield.minefield[0].length) {
        if (minefield.minefield[r][c].cellState === 'closed') {
          queue.push(neighbor)
        }
      }
    })
    console.log(`cell ${row} ${col} has ${queue.length} neighbors to open`);
    queue.forEach((neighbor: any) => {
      const [r, c] = neighbor
      if (r >= 0 && r < minefield.minefield.length && c >= 0 && c < minefield.minefield[0].length) {

        if (!minefield.minefield[r]?.[c]) {
          console.log('no cell', r, c);
          return
        }
        if (minefield.minefield[r][c].hasMine) {
          mineCount++
        }
        openIt(r, c)
      }
    })


    if (mineCount > 0) {
      minefield.minefield[row][col].cellState = mineCount
    }
    else {
      minefield.minefield[row][col].cellState = 'open'
    }
  }

  switch (action.type) {
    case 'RESET_GAME': {
      const { rows, columns, mines } = action.payload
      const minefield = generateMinefield(rows, columns, mines)
      return { ...state, minefield, gameStatus: 'on' }
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

      // check if game is won
      let closedCells = 0
      minefield.minefield.forEach((row: any) => {
        row.forEach((cell: any) => {
          if (minefield.minefield[rownum][colnum].cellState === 'closed') closedCells++
        })
      })
      if (closedCells === state.mines) {
        gameStatus = 'won'
      }

      return { ...state, minefield: minefield.minefield, gameStatus }
    }
    case 'RIGHT_CLICKED_ON_CLOSED_CELL': {
      let gameStatus = state.gameStatus
      if (gameStatus !== 'on') return state
      const { position } = action.payload
      const { rownum, colnum } = position
      const minefield = [...state.minefield]
      const cell = minefield[rownum][colnum]
      cell.cellState = 'flag'
      minefield[rownum][colnum] = cell
      return { ...state, minefield }
    }
    case 'RIGHT_CLICKED_ON_FLAG_CELL': {
      let gameStatus = state.gameStatus
      if (gameStatus !== 'on') return state
      const { position } = action.payload
      const { rownum, colnum } = position
      const minefield = [...state.minefield]
      const cell = minefield[rownum][colnum]
      cell.cellState = 'maybe'
      minefield[rownum][colnum] = cell
      return { ...state, minefield }
    }
    case 'RIGHT_CLICKED_ON_MAYBE_CELL': {
      let gameStatus = state.gameStatus
      if (gameStatus !== 'on') return state
      const { position } = action.payload
      const { rownum, colnum } = position
      const minefield = [...state.minefield]
      const cell = minefield[rownum][colnum]
      cell.cellState = 'closed'
      minefield[rownum][colnum] = cell
      return { ...state, minefield }
    }
    default: {
      return state
    }
  }
}

export default reducer






