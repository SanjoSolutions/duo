import { lastItem } from '../lib/array/lastItem'
import { remove } from '../lib/array/remove'
import { shuffle } from '../lib/shuffle/shuffle'
import { Card } from './Card'
import { Color } from './Color'
import { createDeck } from './createDeck'
import { Player } from './Player'
import { Type } from './Type'
import { last } from '../unnamed/packages/array/src/last.js'

export class Game {
  static NUMBER_OF_CARDS_DEALT_TO_EACH_PLAYER = 7
  static NUMBER_OF_CARDS_WHEN_TO_SAY_DUO = 2
  static NUMBER_OF_CARDS_TO_DRAW_FROM_DRAW_2 = 2
  static NUMBER_OF_CARDS_TO_DRAW_FROM_WILD_DRAW_4 = 4

  players: Player[]
  _currentPlayerIndex: number
  private _hasCurrentPlayerPlayedACard: boolean
  private _hasCurrentPlayerSayedDuo: boolean
  deck: Card[]
  playedCards: Card[]
  winner: Player | null

  constructor() {
    this.players = []
    this._currentPlayerIndex = 0
    this._hasCurrentPlayerPlayedACard = false
    this._hasCurrentPlayerSayedDuo = false
    this.deck = createDeck()
    this.playedCards = []
    this.winner = null
  }

  get card(): Card {
    return lastItem(this.playedCards)
  }

  get currentPlayer(): Player {
    return this.players[this._currentPlayerIndex]
  }

  get hasCurrentPlayerPlayedACard(): boolean {
    return this._hasCurrentPlayerPlayedACard
  }

  get hasCurrentPlayerSayedDuo(): boolean {
    return this._hasCurrentPlayerSayedDuo
  }

  initialize(): void {
    this.deck = shuffle(this.deck)
    this._givePlayerCards()
    this._showFirstCard()
  }

  start(): void {
    this.players[0].notifyOnceTurn()
  }

  private _givePlayerCards() {
    for (let count = 1; count <= Game.NUMBER_OF_CARDS_DEALT_TO_EACH_PLAYER; count++) {
      for (const player of this.players) {
        const card = this.deck.pop()
        if (!card) {
          throw new Error('Deck seems empty')
        }
        player.cards.push(card)
      }
    }
  }

  private _showFirstCard() {
    const card = this.deck.pop()
    if (!card) {
      throw new Error('Deck seems empty')
    }
    this.playedCards.push(card)
  }

  addPlayer(player: Player): void {
    this.players.push(player)
  }

  playCard(card: Card): void {
    if (this.isCardPlayable(card)) {
      remove(this.currentPlayer.cards, card)
      this.playedCards.push(card)
      this._hasCurrentPlayerPlayedACard = true
    } else {
      throw new Error('Card must have same type or color.')
    }
  }

  chooseColor(color: Color): void {
    last(this.playedCards).color = color
  }

  sayDuo(): void {
    this._hasCurrentPlayerSayedDuo = true
  }

  endTurn(): void {
    if (!this.hasCurrentPlayerPlayedACard) {
      throw new Error()
    }

    if (
      this.currentPlayer.cards.length ===
      Game.NUMBER_OF_CARDS_WHEN_TO_SAY_DUO &&
      !this.hasCurrentPlayerSayedDuo
    ) {
      const card1 = this.deck.pop()
      if (!card1) {
        throw new Error('Deck seems empty')
      }
      const card2 = this.deck.pop()
      if (!card2) {
        throw new Error('Deck seems empty')
      }
      this.currentPlayer.cards.push(card1, card2)
    }

    if (this.currentPlayer.cards.length === 0) {
      this.winner = this.currentPlayer
    } else {
      this._nextPlayer()

      if (lastItem(this.playedCards).type === Type.Draw2) {
        this._drawCardsAndSkip(Game.NUMBER_OF_CARDS_TO_DRAW_FROM_DRAW_2)
      } else if (lastItem(this.playedCards).type === Type.WildDraw4) {
        this._drawCardsAndSkip(Game.NUMBER_OF_CARDS_TO_DRAW_FROM_WILD_DRAW_4)
      }
    }
  }

  private _drawCardsAndSkip(numberOfCardsToDraw: number): void {
    for (let count = 1; count <= numberOfCardsToDraw; count++) {
      const card = this.deck.pop()
      if (!card) {
        throw new Error('Deck seems empty')
      }
      this.currentPlayer.cards.push(card)
    }
    this._nextPlayer()
  }

  private _nextPlayer() {
    this._currentPlayerIndex =
      (this._currentPlayerIndex + 1) % this.players.length
    this._hasCurrentPlayerPlayedACard = false
    this._hasCurrentPlayerSayedDuo = false
  }

  drawCard(): Card {
    const drawnCard = this.deck.pop()
    if (!drawnCard) {
      throw new Error('Deck seems empty')
    }
    if (this.deck.length === 0) {
      this._usePlayedCardsAsDeck()
    }
    return drawnCard
  }

  _usePlayedCardsAsDeck(): void {
    const cards = shuffle(this.playedCards.slice(0, this.playedCards.length - 1))
    this.playedCards = [last(this.playedCards)]
    this.deck = cards
  }

  isCardPlayable(card: Card): boolean {
    const lastPlayedCard = last(this.playedCards)
    return (
      card.type === lastPlayedCard.type ||
      card.color === lastPlayedCard.color ||
      card.color === undefined
    )
  }
}
