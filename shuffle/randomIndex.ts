import { randomInteger } from './randomInteger'

export function randomIndex(values: any[]): number {
  return randomInteger(0, values.length - 1)
}
