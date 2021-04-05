import { Card } from "./Card.js";
import { Game } from "./Game.js";

export class Player {
  _game: Game;
  cards: Card[];

  constructor(game: Game) {
    this._game = game;
    this.cards = [];
  }

  notifyOnceTurn(): void {}

  playCard(card: Card): void {
    this._game.playCard(card);
  }

  sayDuo(): void {
    this._game.sayDuo();
  }

  endTurn(): void {
    this._game.endTurn();
  }
}
