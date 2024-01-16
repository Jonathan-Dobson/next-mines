export default function getNeighbors(r: number, c: number, max: [number, number]): [number, number][] {
  const neighbors = [
    [r - 1, c], [r - 1, c + 1], [r, c + 1], [r + 1, c + 1], [r + 1, c], [r + 1, c - 1], [r, c - 1], [r - 1, c - 1]
  ] as [number, number][]

  // filter out neighbors that are out of bounds
  return neighbors.filter((neighbor: any) => {
    const [r, c] = neighbor
    if (r >= 0 && r < max[0] && c >= 0 && c < max[1]) {
      return true
    }
    return false
  })
}