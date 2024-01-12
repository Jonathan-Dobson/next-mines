import { MinefieldType } from '../types'

export default function isWithinLimit(r: number, c: number, minefield: MinefieldType) {
  let maxGridSize = minefield.length
  return (r >= 0 && r < maxGridSize && c >= 0 && c < maxGridSize)
};