import { lastItem } from './lastItem.js'

describe('lastItem', () => {
  it('returns the last item', () => {
    const values = [1, 2]
    expect(lastItem(values)).toEqual(2)
  })
})
