import { range } from './range.js'

describe('range', () => {
  test('returns a range from inclusive to inclusive', () => {
    expect(range(1, 2)).toEqual([1, 2])
  })
})
