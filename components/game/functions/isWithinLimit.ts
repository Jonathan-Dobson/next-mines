export default function isWithinLimit(r: number, c: number, minefield: any[]) {
  let maxGridSize = minefield.length
  return (r >= 0 && r < maxGridSize && c >= 0 && c < maxGridSize)
};