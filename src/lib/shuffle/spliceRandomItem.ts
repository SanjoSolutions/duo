import { randomIndex } from './randomIndex.js'

export function spliceRandomItem<T>(values: T[]): T {
  const index = randomIndex(values)
  const items = values.splice(index, 1)
  const item = items[0]
  return item
}
