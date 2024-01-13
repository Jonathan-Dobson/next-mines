import { MinefieldType, CellType, MinefieldRowType } from '@/components/game/types'

type GenerateMinefieldProps = {
  size: number,
  mines: number
}

export default function generateMinefield({ size, mines }: GenerateMinefieldProps): MinefieldType {
  // Create Minefield
  const rows: MinefieldType = Array.from(
    { length: size }, () => Array.from(
      { length: size },
      () => ({ cellState: "closed", hasMine: false })))

  // Populate Minefield with mines
  for (let i = 0; i < mines; i++) {
    let randomRow = Math.floor(Math.random() * size)
    let randomCol = Math.floor(Math.random() * size)
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