export default function getAdjacentCellPositions(r: number, c: number) {
  return [
    [r - 1, c], [r - 1, c + 1], [r, c + 1], [r + 1, c + 1], [r + 1, c], [r + 1, c - 1], [r, c - 1], [r - 1, c - 1]
  ]
}