import Mock = jest.Mock

jest.mock('./randomIndex')

import { randomIndex } from './randomIndex'
import { spliceRandomItem } from './spliceRandomItem'

describe('spliceRandomItem', () => {
  test('splices a random item', () => {
    const values = [1, 2]
    ;(randomIndex as Mock).mockReturnValue(1)
    const value = spliceRandomItem(values)
    expect(value).toEqual(2)
    expect(values).toEqual([1])
  })
})
