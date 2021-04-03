import { Card } from './Card'
import { Game } from './Game'

export class Player {
  _game: Game
  cards: Card[]

  constructor(game: Game) {
    this._game = game
    this.cards = []
  }

  notifyOnceTurn() {

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
