import openIt from './openIt'
import rightClick from './rightClick'
import type { SetMinefieldType } from '@/components/game/types.d.ts';

export default function cellCommands(setMinefield: SetMinefieldType) {
  return {
    openIt: openIt(setMinefield),
    flagIt: rightClick(setMinefield, 'flag'),
    maybeIt: rightClick(setMinefield, 'maybe'),
    clearIt: rightClick(setMinefield, 'closed'),
  }
}