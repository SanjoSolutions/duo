import { Card } from './Card'
import { Type } from './Type'

describe('Card', () => {
  describe('creating a special card', () => {
    it('works', () => {
      const card = new Card(Type.Draw2)
      expect(card).toEqual({
        type: Type.Draw2,
        color: undefined
      })
    })
  })
})
