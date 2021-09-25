import { Card } from './Card'
import { Color } from './Color'
import { createSetDeck } from './createSetDeck'
import { Type } from './Type'

describe('createSetDeck', () => {
  it('creates a deck, giving the players the specified cards, and with a specified start card', () => {
    const deck = createSetDeck({
      players: [
        [
          new Card(Type.One, Color.Blue),
          new Card(Type.Two, Color.Blue),
          new Card(Type.Three, Color.Blue),
          new Card(Type.Four, Color.Blue),
          new Card(Type.Five, Color.Blue),
          new Card(Type.Six, Color.Blue),
          new Card(Type.Seven, Color.Blue),
        ],
        [
          new Card(Type.Eight, Color.Blue),
          new Card(Type.Nine, Color.Blue),
          new Card(Type.Skip, Color.Blue),
          new Card(Type.Reverse, Color.Blue),
          new Card(Type.Draw2, Color.Blue),
          new Card(Type.One, Color.Blue),
          new Card(Type.Two, Color.Blue),
        ],
      ],
      startCard: new Card(Type.Zero, Color.Blue),
    })
    expect(deck).toEqual(
      [
        new Card(Type.Three, Color.Blue),
        new Card(Type.Four, Color.Blue),
        new Card(Type.Five, Color.Blue),
        new Card(Type.Six, Color.Blue),
        new Card(Type.Seven, Color.Blue),
        new Card(Type.Eight, Color.Blue),
        new Card(Type.Nine, Color.Blue),
        new Card(Type.Skip, Color.Blue),
        new Card(Type.Reverse, Color.Blue),
        new Card(Type.Draw2, Color.Blue),
        new Card(Type.Zero, Color.Green),
        new Card(Type.One, Color.Green),
        new Card(Type.Two, Color.Green),
        new Card(Type.Three, Color.Green),
        new Card(Type.Four, Color.Green),
        new Card(Type.Five, Color.Green),
        new Card(Type.Six, Color.Green),
        new Card(Type.Seven, Color.Green),
        new Card(Type.Eight, Color.Green),
        new Card(Type.Nine, Color.Green),
        new Card(Type.Skip, Color.Green),
        new Card(Type.Reverse, Color.Green),
        new Card(Type.Draw2, Color.Green),
        new Card(Type.One, Color.Green),
        new Card(Type.Two, Color.Green),
        new Card(Type.Three, Color.Green),
        new Card(Type.Four, Color.Green),
        new Card(Type.Five, Color.Green),
        new Card(Type.Six, Color.Green),
        new Card(Type.Seven, Color.Green),
        new Card(Type.Eight, Color.Green),
        new Card(Type.Nine, Color.Green),
        new Card(Type.Skip, Color.Green),
        new Card(Type.Reverse, Color.Green),
        new Card(Type.Draw2, Color.Green),
        new Card(Type.Zero, Color.Red),
        new Card(Type.One, Color.Red),
        new Card(Type.Two, Color.Red),
        new Card(Type.Three, Color.Red),
        new Card(Type.Four, Color.Red),
        new Card(Type.Five, Color.Red),
        new Card(Type.Six, Color.Red),
        new Card(Type.Seven, Color.Red),
        new Card(Type.Eight, Color.Red),
        new Card(Type.Nine, Color.Red),
        new Card(Type.Skip, Color.Red),
        new Card(Type.Reverse, Color.Red),
        new Card(Type.Draw2, Color.Red),
        new Card(Type.One, Color.Red),
        new Card(Type.Two, Color.Red),
        new Card(Type.Three, Color.Red),
        new Card(Type.Four, Color.Red),
        new Card(Type.Five, Color.Red),
        new Card(Type.Six, Color.Red),
        new Card(Type.Seven, Color.Red),
        new Card(Type.Eight, Color.Red),
        new Card(Type.Nine, Color.Red),
        new Card(Type.Skip, Color.Red),
        new Card(Type.Reverse, Color.Red),
        new Card(Type.Draw2, Color.Red),
        new Card(Type.Zero, Color.Yellow),
        new Card(Type.One, Color.Yellow),
        new Card(Type.Two, Color.Yellow),
        new Card(Type.Three, Color.Yellow),
        new Card(Type.Four, Color.Yellow),
        new Card(Type.Five, Color.Yellow),
        new Card(Type.Six, Color.Yellow),
        new Card(Type.Seven, Color.Yellow),
        new Card(Type.Eight, Color.Yellow),
        new Card(Type.Nine, Color.Yellow),
        new Card(Type.Skip, Color.Yellow),
        new Card(Type.Reverse, Color.Yellow),
        new Card(Type.Draw2, Color.Yellow),
        new Card(Type.One, Color.Yellow),
        new Card(Type.Two, Color.Yellow),
        new Card(Type.Three, Color.Yellow),
        new Card(Type.Four, Color.Yellow),
        new Card(Type.Five, Color.Yellow),
        new Card(Type.Six, Color.Yellow),
        new Card(Type.Seven, Color.Yellow),
        new Card(Type.Eight, Color.Yellow),
        new Card(Type.Nine, Color.Yellow),
        new Card(Type.Skip, Color.Yellow),
        new Card(Type.Reverse, Color.Yellow),
        new Card(Type.Draw2, Color.Yellow),
        new Card(Type.Wild),
        new Card(Type.Wild),
        new Card(Type.Wild),
        new Card(Type.Wild),
        new Card(Type.WildDraw4),
        new Card(Type.WildDraw4),
        new Card(Type.WildDraw4),
        new Card(Type.WildDraw4),
        new Card(Type.Zero, Color.Blue),
        new Card(Type.Two, Color.Blue),
        new Card(Type.Seven, Color.Blue),
        new Card(Type.One, Color.Blue),
        new Card(Type.Six, Color.Blue),
        new Card(Type.Draw2, Color.Blue),
        new Card(Type.Five, Color.Blue),
        new Card(Type.Reverse, Color.Blue),
        new Card(Type.Four, Color.Blue),
        new Card(Type.Skip, Color.Blue),
        new Card(Type.Three, Color.Blue),
        new Card(Type.Nine, Color.Blue),
        new Card(Type.Two, Color.Blue),
        new Card(Type.Eight, Color.Blue),
        new Card(Type.One, Color.Blue),
      ],
    )
  })

  it(
    'creates a deck, giving the players the specified cards, and with a specified start card (only some of the player cards are specified)',
    () => {
      const deck = createSetDeck({
        players: [
          [
            new Card(Type.One, Color.Blue),
          ],
          [],
        ],
        startCard: new Card(Type.Zero, Color.Blue),
      })
      expect(deck).toEqual(
        [
          new Card(Type.Two, Color.Blue),
          new Card(Type.Three, Color.Blue),
          new Card(Type.Four, Color.Blue),
          new Card(Type.Five, Color.Blue),
          new Card(Type.Six, Color.Blue),
          new Card(Type.Seven, Color.Blue),
          new Card(Type.Eight, Color.Blue),
          new Card(Type.Nine, Color.Blue),
          new Card(Type.Skip, Color.Blue),
          new Card(Type.Reverse, Color.Blue),
          new Card(Type.Draw2, Color.Blue),
          new Card(Type.One, Color.Blue),
          new Card(Type.Two, Color.Blue),
          new Card(Type.Three, Color.Blue),
          new Card(Type.Four, Color.Blue),
          new Card(Type.Five, Color.Blue),
          new Card(Type.Six, Color.Blue),
          new Card(Type.Seven, Color.Blue),
          new Card(Type.Eight, Color.Blue),
          new Card(Type.Nine, Color.Blue),
          new Card(Type.Skip, Color.Blue),
          new Card(Type.Reverse, Color.Blue),
          new Card(Type.Draw2, Color.Blue),
          new Card(Type.Zero, Color.Green),
          new Card(Type.One, Color.Green),
          new Card(Type.Two, Color.Green),
          new Card(Type.Three, Color.Green),
          new Card(Type.Four, Color.Green),
          new Card(Type.Five, Color.Green),
          new Card(Type.Six, Color.Green),
          new Card(Type.Seven, Color.Green),
          new Card(Type.Eight, Color.Green),
          new Card(Type.Nine, Color.Green),
          new Card(Type.Skip, Color.Green),
          new Card(Type.Reverse, Color.Green),
          new Card(Type.Draw2, Color.Green),
          new Card(Type.One, Color.Green),
          new Card(Type.Two, Color.Green),
          new Card(Type.Three, Color.Green),
          new Card(Type.Four, Color.Green),
          new Card(Type.Five, Color.Green),
          new Card(Type.Six, Color.Green),
          new Card(Type.Seven, Color.Green),
          new Card(Type.Eight, Color.Green),
          new Card(Type.Nine, Color.Green),
          new Card(Type.Skip, Color.Green),
          new Card(Type.Reverse, Color.Green),
          new Card(Type.Draw2, Color.Green),
          new Card(Type.Zero, Color.Red),
          new Card(Type.One, Color.Red),
          new Card(Type.Two, Color.Red),
          new Card(Type.Three, Color.Red),
          new Card(Type.Four, Color.Red),
          new Card(Type.Five, Color.Red),
          new Card(Type.Six, Color.Red),
          new Card(Type.Seven, Color.Red),
          new Card(Type.Eight, Color.Red),
          new Card(Type.Nine, Color.Red),
          new Card(Type.Skip, Color.Red),
          new Card(Type.Reverse, Color.Red),
          new Card(Type.Draw2, Color.Red),
          new Card(Type.One, Color.Red),
          new Card(Type.Two, Color.Red),
          new Card(Type.Three, Color.Red),
          new Card(Type.Four, Color.Red),
          new Card(Type.Five, Color.Red),
          new Card(Type.Six, Color.Red),
          new Card(Type.Seven, Color.Red),
          new Card(Type.Eight, Color.Red),
          new Card(Type.Nine, Color.Red),
          new Card(Type.Skip, Color.Red),
          new Card(Type.Reverse, Color.Red),
          new Card(Type.Draw2, Color.Red),
          new Card(Type.Zero, Color.Yellow),
          new Card(Type.One, Color.Yellow),
          new Card(Type.Two, Color.Yellow),
          new Card(Type.Three, Color.Yellow),
          new Card(Type.Four, Color.Yellow),
          new Card(Type.Five, Color.Yellow),
          new Card(Type.Six, Color.Yellow),
          new Card(Type.Seven, Color.Yellow),
          new Card(Type.Eight, Color.Yellow),
          new Card(Type.Nine, Color.Yellow),
          new Card(Type.Skip, Color.Yellow),
          new Card(Type.Reverse, Color.Yellow),
          new Card(Type.Draw2, Color.Yellow),
          new Card(Type.One, Color.Yellow),
          new Card(Type.Two, Color.Yellow),
          new Card(Type.Three, Color.Yellow),
          new Card(Type.Four, Color.Yellow),
          new Card(Type.Five, Color.Yellow),
          new Card(Type.Six, Color.Yellow),
          new Card(Type.Seven, Color.Yellow),
          new Card(Type.Zero, Color.Blue),
          new Card(Type.Eight, Color.Yellow),
          new Card(Type.Nine, Color.Yellow),
          new Card(Type.Skip, Color.Yellow),
          new Card(Type.Reverse, Color.Yellow),
          new Card(Type.Draw2, Color.Yellow),
          new Card(Type.Wild),
          new Card(Type.Wild),
          new Card(Type.Wild),
          new Card(Type.Wild),
          new Card(Type.WildDraw4),
          new Card(Type.WildDraw4),
          new Card(Type.WildDraw4),
          new Card(Type.WildDraw4),
          new Card(Type.One, Color.Blue),
        ],
      )
    },
  )
})