import { identity } from './identity.js'

describe('identity', () => {
  test('returns the passed value', () => {
    const argument = {}
    expect(identity(argument)).toEqual(argument)
  })
})
