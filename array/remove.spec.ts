import { remove } from './remove'

describe('remove', () => {
  it('removes an item', () => {
    const array = [1, 2, 3]
    remove(array, 2)
    expect(array).toEqual([1, 3])
  })

  it('removes an item by reference', () => {
    const a = {}
    const b = {}
    const array = [a, b]
    remove(array, b)
    expect(array).toEqual([a])
  })
})
