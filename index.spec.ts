import Mock = jest.Mock

jest.mock('./shuffle/shuffle')

import { lastItem } from './array/lastItem'
import { remove } from './array/remove'
import { values } from './enum/values'
import { identity } from './function/identity'
import { shuffle } from './shuffle/shuffle'

class Game {
  static NUMBER_OF_CARDS_TO_DRAW = 2

  players: Player[]
  _currentPlayerIndex: number
  private _hasCurrentPlayerPlayedACard: boolean
  private _hasCurrentPlayerSayedDuo: boolean
  card: Card
  deck: Card[]
  playedCards: Card[]
  winner: Player | null

  constructor() {
    this.players = []
    this._currentPlayerIndex = 0
    this._hasCurrentPlayerPlayedACard = false
    this._hasCurrentPlayerSayedDuo = false
    this.card = new Card(Symbol.One, Color.Red)
    this.deck = this._createDeck()
    this.playedCards = []
    this.winner = null
  }

  get currentPlayer() {
    return this.players[this._currentPlayerIndex]
  }

  get hasCurrentPlayerPlayedACard() {
    return this._hasCurrentPlayerPlayedACard
  }

  get hasCurrentPlayerSayedDuo() {
    return this._hasCurrentPlayerSayedDuo
  }

  _createDeck(): Card[] {
    const deck = []
    for (const color of values(Color)) {
      for (const symbol of values(Symbol)) {
        deck.push(new Card(symbol, color))
      }
    }
    return deck
  }

  start() {
    this.deck = shuffle(this.deck)
    this._givePlayerCards()
  }

  private _givePlayerCards() {
    for (let count = 1; count <= 5; count++) {
      for (const player of this.players) {
        const card = this.deck.pop()
        if (!card) {
          throw new Error('Deck has 0 cards left.')
        }
        player.cards.push(card)
      }
    }
  }

  addPlayer(player: Player) {
    this.players.push(player)
  }

  playCard(card: Card) {
    if (
      card.symbol === this.card.symbol ||
      card.color === this.card.color
    ) {
      remove(this.currentPlayer.cards, card)
      this._hasCurrentPlayerPlayedACard = true
    } else {
      throw new Error()
    }
  }

  sayDuo() {
    this._hasCurrentPlayerSayedDuo = true
  }

  endTurn() {
    if (!this.hasCurrentPlayerPlayedACard) {
      throw new Error()
    }

    if (
      this.currentPlayer.cards.length === Game.NUMBER_OF_CARDS_TO_DRAW &&
      !this.hasCurrentPlayerSayedDuo
    ) {
      this.currentPlayer.cards.push(
        new Card(Symbol.One, Color.Red),
        new Card(Symbol.Two, Color.Red)
      )
    }

    if (this.currentPlayer.cards.length === 0) {
      this.winner = this.currentPlayer
    } else {
      this._hasCurrentPlayerSayedDuo = false
      this._currentPlayerIndex = (this._currentPlayerIndex + 1) % this.players.length
    }
  }

  drawCard() {
    const drawnCard = this.deck.pop()
    if (this.deck.length === 0) {
      this._usePlayedCardsAsDeck()
    }
    return drawnCard
  }

  _usePlayedCardsAsDeck() {
    const cards = shuffle(this.playedCards)
    this.playedCards = []
    this.deck = cards
  }
}

class Player {
  _game: Game
  cards: Card[]

  constructor(game: Game) {
    this._game = game
    this.cards = []
  }

  playCard(card: Card) {
    this._game.playCard(card)
  }

  sayDuo() {
    this._game.sayDuo()
  }

  endTurn() {
    this._game.endTurn()
  }
}

class Card {
  symbol: Symbol
  color: Color

  constructor(symbol: Symbol, color: Color) {
    this.symbol = symbol
    this.color = color
  }
}

enum Symbol {
  Zero = 0,
  One = 1,
  Two = 2,
  Three = 3,
  Four = 4,
  Five = 5,
  Six = 6,
  Seven = 7,
  Eight = 8,
  Nine = 9,
  SkipPlayer = 10,
  ReverseTurnOrder = 11,
  DrawTwo = 12,
  WishColor = 13,
  WishColorAndDrawFour = 14
}

enum Color {
  Red = 1,
  Green = 2,
  Blue = 3,
  Yellow = 4
}

describe('duo', () => {
  beforeEach(() => {
    ;(shuffle as Mock).mockImplementation(identity)
  })

  describe('start', () => {
    let game: Game

    beforeEach(() => {
      game = createGameWithTwoPlayers().game
    })

    test('deck is shuffled', () => {
      const deckBeforeShuffle = game.deck
      const shuffledDeck = Array.from(deckBeforeShuffle)
      ;(shuffle as Mock).mockReturnValue(shuffledDeck)
      game.start()
      expect(shuffle).toHaveBeenCalledWith(deckBeforeShuffle)
      expect(game.deck).toBe(shuffledDeck)
    })

    test('each player is given 5 cards', () => {
      game.start()
      for (const player of game.players) {
        expect(player.cards).toHaveLength(5)
      }
    })
  })

  describe('first card', () => {
    test('a card is shown', () => {
      const { game } = createGameWithTwoPlayers()
      expect(game.card).toBeInstanceOf(Card)
    })
  })

  describe('playing a card', () => {
    test(
      'it is allowed to play a card that matches in color with the current card',
      () => {
        const { game, players } = createGameWithTwoPlayers()
        game.card = new Card(Symbol.Two, Color.Red)
        players[0].cards.push(new Card(Symbol.Three, Color.Red))
        expect(() => players[0].playCard(players[0].cards[0]))
          .not.toThrow()
      },
    )

    test(
      'it is allowed to play a card that matches in symbol with the current card',
      () => {
        const { game, players } = createGameWithTwoPlayers()
        game.card = new Card(Symbol.Two, Color.Red)
        players[0].cards.push(new Card(Symbol.Two, Color.Green))
        expect(() => players[0].playCard(players[0].cards[0]))
          .not.toThrow()
      },
    )

    test(
      'when a number card or a skip player, reverse turn order or draw two card is played that has a different symbol and a different color than the current card, an error is thrown',
      () => {
        const { game, players } = createGameWithTwoPlayers()
        game.card = new Card(Symbol.Two, Color.Red)
        players[0].cards.push(new Card(Symbol.Three, Color.Green))
        expect(() => players[0].playCard(players[0].cards[0])).toThrow()
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
        const { players } = createGameWithTwoPlayers()
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
      const { players } = createGameWithTwoPlayers()
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
