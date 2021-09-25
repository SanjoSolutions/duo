import Mock = jest.Mock

import { shuffle } from '../lib/shuffle/shuffle.js'
import { Card } from './Card.js'
import { createSetDeck } from './createSetDeck.js'

export function setDeck({ players, startCard }: { players: Card[][]; startCard: Card }): void {
  (shuffle as Mock)
    .mockReturnValue(createSetDeck({ players, startCard }))
}
