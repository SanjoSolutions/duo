import { Card } from './Card'
import { createDeck } from './createDeck'
import type { Deck } from './Deck'
import { Game } from './Game'

export function createSetDeck({ players, startCard }: { players: Card[][]; startCard: Card }): Deck {
  let deck = createDeck()
  const topCards = []
  for (let cardIndex = 0; cardIndex < Game.NUMBER_OF_CARDS_DEALT_TO_EACH_PLAYER; cardIndex++) {
    for (let playerIndex = 0; playerIndex < players.length; playerIndex++) {
      let cardFromDeck
      if (cardIndex < players[playerIndex].length) {
        const card = players[playerIndex][cardIndex]
        cardFromDeck = removeOne(deck, card)
      } else {
        cardFromDeck = removeTopCard(deck)
      }
      topCards.push(cardFromDeck)
    }
  }
  const cardFromDeck = removeOne(deck, startCard)
  topCards.push(cardFromDeck)
  deck = deck.concat(topCards.reverse())
  return deck
}

function removeOne(deck: Deck, card: Card): Card {
  const index = deck.findIndex(Card.isEqual.bind(null, card))
  const cards = deck.splice(index, 1)
  return cards[0]
}

function removeTopCard(deck: Deck): Card {
  return deck.splice(deck.length - 1, 1)[0]
}
