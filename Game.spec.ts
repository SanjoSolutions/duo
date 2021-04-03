import Mock = jest.Mock

jest.mock('./shuffle/shuffle')

import { lastItem } from './array/lastItem'
import { Card } from './Card'
import { Color } from './Color'
import { identity } from './function/identity'
import { Game } from './Game'
import { Player } from './Player'
import { shuffle } from './shuffle/shuffle'
import { Symbol } from './Symbol'

describe('duo', () => {
  beforeEach(() => {
    ;(shuffle as Mock).mockImplementation(identity)
  })

  describe('initialize', () => {
    let game: Game

    beforeEach(() => {
      game = createGameWithTwoPlayers().game
    })

    test('deck is shuffled', () => {
      const deckBeforeShuffle = game.deck
      const shuffledDeck = Array.from(deckBeforeShuffle)
      ;(shuffle as Mock).mockReturnValue(shuffledDeck)
      game.initialize()
      expect(shuffle).toHaveBeenCalledWith(deckBeforeShuffle)
      expect(game.deck).toBe(shuffledDeck)
    })

    test('each player is given 5 cards', () => {
      game.initialize()
      for (const player of game.players) {
        expect(player.cards).toHaveLength(5)
      }
    })

    test('a first card is shown', () => {
      const { game } = createGameWithTwoPlayers()
      game.initialize()
      expect(game.card).toBeInstanceOf(Card)
    })
  })

  describe('playing a card', () => {
    test(
      'it is allowed to play a card that matches in color with the current card',
      () => {
        const { game, players } = createGameWithTwoPlayers()
        game.playedCards.push(new Card(Symbol.Two, Color.Red))
        players[0].cards.push(new Card(Symbol.Three, Color.Red))
        expect(() => players[0].playCard(players[0].cards[0]))
          .not.toThrow()
      },
    )

    test(
      'it is allowed to play a card that matches in symbol with the current card',
      () => {
        const { game, players } = createGameWithTwoPlayers()
        game.playedCards.push(new Card(Symbol.Two, Color.Red))
        players[0].cards.push(new Card(Symbol.Two, Color.Green))
        expect(() => players[0].playCard(players[0].cards[0]))
          .not.toThrow()
      },
    )

    test(
      'when a number card or a skip player, reverse turn order or draw two card is played that has a different symbol and a different color than the current card, an error is thrown',
      () => {
        const { game, players } = createGameWithTwoPlayers()
        game.playedCards.push(new Card(Symbol.Two, Color.Red))
        players[0].cards.push(new Card(Symbol.Three, Color.Green))
        expect(() => players[0].playCard(players[0].cards[0]))
          .toThrow('Card must have same symbol or color.')
      },
    )

    describe('when the deck has 0 cards left', () => {
      let game: Game
      let playedCard: Card

      beforeEach(() => {
        game = createGameWithTwoPlayers().game
        game.deck = [new Card(Symbol.One, Color.Red)]
        playedCard = new Card(Symbol.Two, Color.Red)
        game.playedCards = [playedCard]
        game.drawCard()
      })

      test('the played cards are shuffled', () => {
        expect(shuffle).toHaveBeenCalledWith([playedCard])
      })

      test('the played cards are used as deck', () => {
        expect(game.deck).toEqual([playedCard])
      })

      test('the played cards are reset', () => {
        expect(game.playedCards).toHaveLength(0)
      })
    })
  })

  describe('drawing a card', () => {
    it('removes the top card of the deck and returns the card', () => {
      const game = new Game()
      const topCard = lastItem(game.deck)
      const deckLength = game.deck.length
      const drawnCard = game.drawCard()
      expect(game.deck).toHaveLength(deckLength - 1)
      expect(drawnCard).toEqual(topCard)
    })
  })

  describe('"duo" game mechanic', () => {
    test(
      'when a player has two cards left ' +
      'and ends the turn before the player says "duo" ' +
      'then the player has to draw two cards',
      () => {
        const { game, players } = createGameWithTwoPlayers()
        game.playedCards.push(new Card(Symbol.One, Color.Red))
        players[0].cards = [
          new Card(Symbol.One, Color.Red),
          new Card(Symbol.Two, Color.Red),
          new Card(Symbol.Three, Color.Red)
        ]
        players[0].playCard(players[0].cards[0])
        const numberOfCards = players[0].cards.length
        players[0].endTurn()
        expect(players[0].cards.length)
          .toEqual(numberOfCards + Game.NUMBER_OF_CARDS_TO_DRAW)
      },
    )

    test('when the player, whose turn it is, has two cards left ' +
      'and ends the turn after saying "duo" ' +
      'then the player has as many cards as before ending the turn', () => {
      const { game, players } = createGameWithTwoPlayers()
      game.playedCards.push(new Card(Symbol.One, Color.Red))
      players[0].cards = [
        new Card(Symbol.One, Color.Red),
        new Card(Symbol.Two, Color.Red),
        new Card(Symbol.Three, Color.Red)
      ]
      players[0].playCard(players[0].cards[0])
      players[0].sayDuo()
      const numberOfCards = players[0].cards.length
      players[0].endTurn()
      expect(players[0].cards.length).toEqual(numberOfCards)
    })

    test('the hasCurrentPlayerSayedDuo resets after endTurn', () => {
      const { game, players } = createGameWithTwoPlayers()
      game.playedCards.push(new Card(Symbol.One, Color.Red))
      players[0].cards.push(
        new Card(Symbol.One, Color.Red),
        new Card(Symbol.Two, Color.Red)
      )
      players[0].playCard(players[0].cards[0])
      players[0].sayDuo()
      players[0].endTurn()
      expect(game.hasCurrentPlayerSayedDuo).toEqual(false)
    })
  })

  describe('turn mechanic', () => {
    describe(
      'the player, which turn it is, has to play a card, before they can end the turn',
      () => {
        test(
          'when the player, which turn it is, ends the turn, before playing a card, endTurn throws an error',
          () => {
            const { players } = createGameWithTwoPlayers()

            expect(() => players[0].endTurn()).toThrow()
          },
        )
      },
    )

    test(
      "after the player, which turn it is, end the turn, " +
      "it's the next player's turn",
      () => {
        const { game, players } = createGameWithTwoPlayers()
        game.playedCards.push(new Card(Symbol.One, Color.Red))
        players[0].cards.push(
          new Card(Symbol.One, Color.Red),
          new Card(Symbol.Two, Color.Red)
        )
        players[0].playCard(players[0].cards[0])
        players[0].endTurn()
        expect(game.currentPlayer).toBe(players[1])
      },
    )
  })

  describe('win condition', () => {
    test('when a player has 0 cards, they win', () => {
      const { game, players } = createGameWithTwoPlayers()
      game.playedCards.push(new Card(Symbol.One, Color.Red))
      players[0].cards.push(
        new Card(Symbol.One, Color.Red)
      )
      players[0].playCard(players[0].cards[0])
      players[0].endTurn()
      expect(game.winner).toEqual(players[0])
    })
  })
})

function createGameWithTwoPlayers() {
  const game = new Game()
  const playerA = new Player(game)
  const playerB = new Player(game)
  const players = [
    playerA,
    playerB,
  ]
  game.addPlayer(playerA)
  game.addPlayer(playerB)
  return { game, players }
}
