import { lastItem } from "../lib/array/lastItem.js";
import { remove } from "../lib/array/remove.js";
import { Card } from "./Card.js";
import { Color } from "./Color.js";
import { values } from "../lib/enum/values.js";
import { Player } from "./Player.js";
import { shuffle } from "../lib/shuffle/shuffle.js";
import { Type } from "./Type.js";

export class Game {
  static NUMBER_OF_CARDS_WHEN_TO_SAY_DUO = 2;
  static NUMBER_OF_CARDS_TO_DRAW = 2;

  players: Player[];
  _currentPlayerIndex: number;
  private _hasCurrentPlayerPlayedACard: boolean;
  private _hasCurrentPlayerSayedDuo: boolean;
  deck: Card[];
  playedCards: Card[];
  winner: Player | null;

  constructor() {
    this.players = [];
    this._currentPlayerIndex = 0;
    this._hasCurrentPlayerPlayedACard = false;
    this._hasCurrentPlayerSayedDuo = false;
    this.deck = this._createDeck();
    this.playedCards = [];
    this.winner = null;
  }

  get card(): Card {
    return lastItem(this.playedCards);
  }

  get currentPlayer() {
    return this.players[this._currentPlayerIndex];
  }

  get hasCurrentPlayerPlayedACard() {
    return this._hasCurrentPlayerPlayedACard;
  }

  get hasCurrentPlayerSayedDuo() {
    return this._hasCurrentPlayerSayedDuo;
  }

  _createDeck(): Card[] {
    const deck = [];
    for (const color of values(Color)) {
      for (const type of values(Type)) {
        deck.push(new Card(type, color));
      }
    }
    return deck;
  }

  initialize() {
    this.deck = shuffle(this.deck);
    this._givePlayerCards();
    this._showFirstCard();
  }

  start() {
    this.players[0].notifyOnceTurn();
  }

  private _givePlayerCards() {
    for (let count = 1; count <= 5; count++) {
      for (const player of this.players) {
        const card = this.deck.pop()!;
        player.cards.push(card);
      }
    }
  }

  private _showFirstCard() {
    const card = this.deck.pop()!;
    this.playedCards.push(card);
  }

  addPlayer(player: Player) {
    this.players.push(player);
  }

  playCard(card: Card) {
    if (this.isCardPlayable(card)) {
      remove(this.currentPlayer.cards, card);
      this.playedCards.push(card);
      this._hasCurrentPlayerPlayedACard = true;
    } else {
      throw new Error("Card must have same type or color.");
    }
  }

  sayDuo() {
    this._hasCurrentPlayerSayedDuo = true;
  }

  endTurn() {
    if (!this.hasCurrentPlayerPlayedACard) {
      throw new Error();
    }

    if (
      this.currentPlayer.cards.length ===
        Game.NUMBER_OF_CARDS_WHEN_TO_SAY_DUO &&
      !this.hasCurrentPlayerSayedDuo
    ) {
      this.currentPlayer.cards.push(this.deck.pop()!, this.deck.pop()!);
    }

    if (this.currentPlayer.cards.length === 0) {
      this.winner = this.currentPlayer;
    } else {
      this._nextPlayer();

      if (lastItem(this.playedCards).type === Type.DrawTwo) {
        for (let count = 1; count <= 2; count++) {
          const card = this.deck.pop()!;
          this.currentPlayer.cards.push(card);
        }
        this._nextPlayer();
      }
    }
  }

  private _nextPlayer() {
    this._currentPlayerIndex =
      (this._currentPlayerIndex + 1) % this.players.length;
    this._hasCurrentPlayerPlayedACard = false;
    this._hasCurrentPlayerSayedDuo = false;
  }

  drawCard() {
    const drawnCard = this.deck.pop();
    if (this.deck.length === 0) {
      this._usePlayedCardsAsDeck();
    }
    return drawnCard;
  }

  _usePlayedCardsAsDeck() {
    const cards = shuffle(this.playedCards);
    this.playedCards = [];
    this.deck = cards;
  }

  isCardPlayable(card: Card): boolean {
    return card.type === this.card.type || card.color === this.card.color;
  }
}
