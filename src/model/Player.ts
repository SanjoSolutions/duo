import { Card } from './Card'
import { Color } from './Color'
import { Game } from './Game'

export class Player {
  _game: Game
  cards: Card[]

  constructor(game: Game) {
    this._game = game
    this.cards = []
  }

  notifyOnceTurn(): void {}

  playCard(card: Card): void {
    this._game.playCard(card)
  }

  chooseColor(color: Color): void {
    this._game.chooseColor(color)
  }

  sayDuo(): void {
    this._game.sayDuo()
  }

  endTurn(): void {
    this._game.endTurn()
  }
}
