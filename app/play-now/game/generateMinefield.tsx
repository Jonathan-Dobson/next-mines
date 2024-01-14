import { MinefieldType } from '@/app/play-now/game/types'

export default function generateMinefield(r: number, c: number, mines: number): MinefieldType {
  // Create Minefield
  const rows: MinefieldType = Array.from(
    { length: r }, () => Array.from(
      { length: c },
      () => ({ cellState: "closed", hasMine: false })))

  // Populate Minefield with mines
  for (let i = 0; i < mines; i++) {
    let randomRow = Math.floor(Math.random() * r)
    let randomCol = Math.floor(Math.random() * c)
    // invalidate duplicates
    if (rows[randomRow][randomCol]?.hasMine) { i-- }
    // insert a mine
    rows[randomRow][randomCol] = {
      ...rows[randomRow][randomCol],
      hasMine: true
    };
  }
  return rows
}