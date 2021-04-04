import { CLOSE_TO_MAXIMUM_RANDOM_RETURN_VALUE } from './closeToMaximumRandomReturnValue.js'
import { randomInteger } from './randomInteger.js'

describe('randomInteger', () => {
  test('maximum value', () => {
    jest.spyOn(Math, 'random').mockReturnValue(CLOSE_TO_MAXIMUM_RANDOM_RETURN_VALUE)
    expect(randomInteger(0, 1)).toEqual(1)
  })

  test('minimum value', () => {
    jest.spyOn(Math, 'random').mockReturnValue(0)
    expect(randomInteger(0, 1)).toEqual(0)
  })
})
