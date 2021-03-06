import Mock = jest.Mock

jest.mock('../lib/shuffle/shuffle.js')

import { item } from '../lib/array/item'
import { lastItem } from '../lib/array/lastItem'
import { identity } from '../lib/function/identity'
import { shuffle } from '../lib/shuffle/shuffle'
import { last } from '../unnamed/packages/array/src/last'
import { Card } from './Card'
import { Color } from './Color'
import { Game } from './Game'
import { Player } from './Player'
import { setDeck } from './setDeck'
import { Type } from './Type'

describe('duo', () => {
  beforeEach(() => {
    (shuffle as Mock).mockImplementation(identity)
  })

  describe('initialize', () => {
    let game: Game

    beforeEach(() => {
      game = createGameWithTwoPlayers().game
    })

    test('deck is shuffled', () => {
      const deckBeforeShuffle = game.deck
      const shuffledDeck = Array.from(deckBeforeShuffle);
      (shuffle as Mock).mockReturnValue(shuffledDeck)
      game.initialize()
      expect(shuffle).toHaveBeenCalledWith(deckBeforeShuffle)
      expect(game.deck).toBe(shuffledDeck)
    })

    test(`each player is given ${ Game.NUMBER_OF_CARDS_DEALT_TO_EACH_PLAYER } cards`, () => {
      game.initialize()
      for (const player of game.players) {
        expect(player.cards).toHaveLength(Game.NUMBER_OF_CARDS_DEALT_TO_EACH_PLAYER)
      }
    })

    test('a first card is shown', () => {
      const { game } = createGameWithTwoPlayers()
      game.initialize()
      expect(game.card).toBeInstanceOf(Card)
    })
  })

  describe('playing a card', () => {
    test('it is allowed to play a card that matches in color with the current card', () => {
      const { game, players } = createGameWithTwoPlayers()
      game.playedCards.push(new Card(Type.Two, Color.Red))
      players[0].cards.push(new Card(Type.Three, Color.Red))
      expect(() => players[0].playCard(players[0].cards[0])).not.toThrow()
    })

    test('it is allowed to play a card that matches in type with the current card', () => {
      const { game, players } = createGameWithTwoPlayers()
      game.playedCards.push(new Card(Type.Two, Color.Red))
      players[0].cards.push(new Card(Type.Two, Color.Green))
      expect(() => players[0].playCard(players[0].cards[0])).not.toThrow()
    })

    test(
      'when a number card or a skip, reverse or draw 2 card is played that has a different type and a different color than the current card, an error is thrown',
      () => {
        const { game, players } = createGameWithTwoPlayers()
        game.playedCards.push(new Card(Type.Two, Color.Red))
        players[0].cards.push(new Card(Type.Three, Color.Green))
        expect(() => players[0].playCard(players[0].cards[0])).toThrow(
          'Card must have same type or color.',
        )
      },
    )

    test('the played card is added to playedCards', () => {
      const { game, players } = createGameWithTwoPlayers()
      game.playedCards.push(new Card(Type.Two, Color.Red))
      const card = new Card(Type.Two, Color.Green)
      players[0].cards.push(card)
      players[0].playCard(players[0].cards[0])
      expect(lastItem(game.playedCards)).toBe(card)
    })

    describe('when the deck has 0 cards left', () => {
      test('all but the last played card are put into the deck and the deck is shuffled', () => {
        const game = createGameWithTwoPlayers().game
        game.deck = [new Card(Type.One, Color.Red)]
        const playedCards = [
          new Card(Type.Two, Color.Red),
          new Card(Type.Three, Color.Red),
        ]
        game.playedCards = playedCards
        game.drawCard()
        const cardsThatShouldBePutBackIntoTheDeck = playedCards.slice(0, playedCards.length - 1)
        expect(game.deck).toEqual(cardsThatShouldBePutBackIntoTheDeck)
        expect(shuffle).toHaveBeenCalledWith(cardsThatShouldBePutBackIntoTheDeck)
      })
    })

    describe('playing a "draw two" card', () => {
      test('the next player draws two cards and then the turn ends for the player who draws two cards', () => {
        const { game, players } = createGameWithTwoPlayers()
        setDeck(
          {
            players: [
              [
                new Card(Type.Draw2, Color.Blue),
              ],
              [],
            ],
            startCard: new Card(Type.Zero, Color.Blue),
          },
        )
        game.initialize()
        expect(players[0].cards[0].type).toEqual(Type.Draw2)
        expect(players[0].cards[0].color).toEqual(game.card.color)
        const numberOfCardsOfPlayer1 = players[1].cards.length
        players[0].playCard(players[0].cards[0])
        players[0].endTurn()
        expect(players[1].cards.length).toEqual(
          numberOfCardsOfPlayer1 + Game.NUMBER_OF_CARDS_TO_DRAW_FROM_DRAW_2,
        )
        expect(game.currentPlayer).toBe(players[0])
      })
    })

    describe('reverse', () => {
      describe('with 2 players', () => {
        test('the next player is skipped', () => {
          const { game, players } = createGameWithTwoPlayers()
          setDeck(
            {
              players: [
                [
                  new Card(Type.Reverse, Color.Blue),
                ],
                [],
              ],
              startCard: new Card(Type.Zero, Color.Blue),
            },
          )
          game.initialize()
          players[0].playCard(players[0].cards[0])
          players[0].endTurn()
          expect(game.currentPlayer).toBe(players[0])
        })
      })

      describe('with more than 2 players', () => {
        test('reverses the players turn order', () => {
          const { game, players } = createGameWithThreePlayers()
          setDeck(
            {
              players: [
                [
                  new Card(Type.Reverse, Color.Blue),
                ],
                [],
                [],
              ],
              startCard: new Card(Type.Zero, Color.Blue),
            },
          )
          game.initialize()
          players[0].playCard(players[0].cards[0])
          players[0].endTurn()
          expect(game.currentPlayer).toBe(players[2])
        })
      })
    })

    describe('skip', () => {
      test('the next player is skipped', () => {
        const { game, players } = createGameWithTwoPlayers()
        setDeck(
          {
            players: [
              [
                new Card(Type.Skip, Color.Blue),
              ],
              [],
            ],
            startCard: new Card(Type.Zero, Color.Blue),
          },
        )
        game.initialize()
        players[0].playCard(players[0].cards[0])
        players[0].endTurn()
        expect(game.currentPlayer).toBe(players[0])
      })
    })

    describe('wild card', () => {
      test('the player who plays the wild card has to pick a color with which the play is continued', () => {
        const { game, players } = createGameWithTwoPlayers()
        setDeck(
          {
            players: [
              [
                new Card(Type.Wild),
              ],
              [],
            ],
            startCard: new Card(Type.Zero, Color.Blue),
          },
        )
        game.initialize()
        players[0].playCard(players[0].cards[0])
        players[0].chooseColor(Color.Blue)
        players[0].endTurn()
        expect(last(game.playedCards).color).toEqual(Color.Blue)
      })
    })

    describe('wild card draw 4', () => {
      test(
        'the player who plays the wild card draw 4 has to pick a color with hich the play is continued. the next player draws 4 cards.',
        () => {
          const { game, players } = createGameWithTwoPlayers()
          setDeck(
            {
              players: [
                [
                  new Card(Type.WildDraw4),
                ],
                [],
              ],
              startCard: new Card(Type.Zero, Color.Blue),
            },
          )
          game.initialize()
          players[0].playCard(players[0].cards[0])
          players[0].chooseColor(Color.Blue)
          players[0].endTurn()
          expect(last(game.playedCards).color).toEqual(Color.Blue)
          expect(game.players[1].cards.length).toEqual(
            Game.NUMBER_OF_CARDS_DEALT_TO_EACH_PLAYER + Game.NUMBER_OF_CARDS_TO_DRAW_FROM_WILD_DRAW_4,
          )
        },
      )
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
        game.playedCards.push(new Card(Type.One, Color.Red))
        players[0].cards = [
          new Card(Type.One, Color.Red),
          new Card(Type.Two, Color.Red),
          new Card(Type.Three, Color.Red),
        ]
        players[0].playCard(players[0].cards[0])
        const cardsToDraw = [item(game.deck, -1), item(game.deck, -2)]
        players[0].endTurn()
        expect(item(players[0].cards, -2)).toBe(cardsToDraw[0])
        expect(item(players[0].cards, -1)).toBe(cardsToDraw[1])
      },
    )

    test(
      'when the player, whose turn it is, has two cards left ' +
      'and ends the turn after saying "duo" ' +
      'then the player has as many cards as before ending the turn',
      () => {
        const { game, players } = createGameWithTwoPlayers()
        game.playedCards.push(new Card(Type.One, Color.Red))
        players[0].cards = [
          new Card(Type.One, Color.Red),
          new Card(Type.Two, Color.Red),
          new Card(Type.Three, Color.Red),
        ]
        players[0].playCard(players[0].cards[0])
        players[0].sayDuo()
        const numberOfCards = players[0].cards.length
        players[0].endTurn()
        expect(players[0].cards.length).toEqual(numberOfCards)
      },
    )

    test('the hasCurrentPlayerSayedDuo resets after endTurn', () => {
      const { game, players } = createGameWithTwoPlayers()
      game.playedCards.push(new Card(Type.One, Color.Red))
      players[0].cards.push(
        new Card(Type.One, Color.Red),
        new Card(Type.Two, Color.Red),
      )
      players[0].playCard(players[0].cards[0])
      players[0].sayDuo()
      players[0].endTurn()
      expect(game.hasCurrentPlayerSayedDuo).toEqual(false)
    })
  })

  describe('turn mechanic', () => {
    describe('the player, which turn it is, has to play a card, before they can end the turn', () => {
      test('when the player, which turn it is, ends the turn, before playing a card, endTurn throws an error', () => {
        const { players } = createGameWithTwoPlayers()

        expect(() => players[0].endTurn()).toThrow()
      })
    })

    test(
      'after the player, which turn it is, end the turn, ' +
      'it\'s the next player\'s turn',
      () => {
        const { game, players } = createGameWithTwoPlayers()
        game.playedCards.push(new Card(Type.One, Color.Red))
        players[0].cards.push(
          new Card(Type.One, Color.Red),
          new Card(Type.Two, Color.Red),
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
      game.playedCards.push(new Card(Type.One, Color.Red))
      players[0].cards.push(new Card(Type.One, Color.Red))
      players[0].playCard(players[0].cards[0])
      players[0].endTurn()
      expect(game.winner).toEqual(players[0])
    })
  })

  describe('isCardPlayable', () => {
    it('returns true when the card has the same color as the last played card', () => {
      const game = new Game()
      game.playedCards.push(new Card(Type.Zero, Color.Blue))
      expect(game.isCardPlayable(new Card(Type.One, Color.Blue))).toEqual(true)
    })

    it('returns true when the card has the same type as the last played card', () => {
      const game = new Game()
      game.playedCards.push(new Card(Type.Zero, Color.Blue))
      expect(game.isCardPlayable(new Card(Type.Zero, Color.Red))).toEqual(true)
    })

    it('returns true when the card is a colorless card', () => {
      const game = new Game()
      game.playedCards.push(new Card(Type.Zero, Color.Blue))
      expect(game.isCardPlayable(new Card(Type.Wild))).toEqual(true)
    })
  })
})

function createGameWithTwoPlayers() {
  const game = new Game()
  const playerA = new Player(game)
  const playerB = new Player(game)
  const players = [playerA, playerB]
  game.addPlayer(playerA)
  game.addPlayer(playerB)
  return { game, players }
}

function createGameWithThreePlayers() {
  const game = new Game()
  const playerA = new Player(game)
  const playerB = new Player(game)
  const playerC = new Player(game)
  const players = [playerA, playerB, playerC]
  game.addPlayer(playerA)
  game.addPlayer(playerB)
  game.addPlayer(playerC)
  return { game, players }
}
