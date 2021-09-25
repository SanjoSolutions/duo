import { Card } from './Card'
import { Color } from './Color'
import { Type } from './Type'

describe('Card', () => {
  describe('creating a special card', () => {
    it('works', () => {
      const card = new Card(Type.Draw2)
      expect(card).toEqual({
        type: Type.Draw2,
        color: undefined,
      })
    })
  })

  describe('isEqual', () => {
    it('returns true when two cards are equal', () => {
      const cardA = new Card(Type.Zero, Color.Blue)
      const cardB = new Card(Type.Zero, Color.Blue)
      expect(Card.isEqual(cardA, cardB)).toEqual(true)
    })

    it('returns false when two cards are different', () => {
      const cardA = new Card(Type.Zero, Color.Blue)
      const cardB = new Card(Type.One, Color.Blue)
      expect(Card.isEqual(cardA, cardB)).toEqual(false)
    })
  })
})
