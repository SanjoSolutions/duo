import { lastItem } from "../lib/array/lastItem";
import { remove } from "../lib/array/remove";
import { Card } from "./Card";
import { Color } from "./Color";
import { values } from "../lib/enum/values";
import { Player } from "./Player";
import { shuffle } from "../lib/shuffle/shuffle";
import { Type } from "./Type";

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

  get currentPlayer(): Player {
    return this.players[this._currentPlayerIndex];
  }

  get hasCurrentPlayerPlayedACard(): boolean {
    return this._hasCurrentPlayerPlayedACard;
  }

  get hasCurrentPlayerSayedDuo(): boolean {
    return this._hasCurrentPlayerSayedDuo;
  }

  _createDeck(): Card[] {
    const deck = [];
    for (const color of values(Color)) {
      for (const type of values(Type)) {
        deck.push(new Card(type as Type, color as Color));
      }
    }
    return deck;
  }

  initialize(): void {
    this.deck = shuffle(this.deck);
    this._givePlayerCards();
    this._showFirstCard();
  }

  start(): void {
    this.players[0].notifyOnceTurn();
  }

  private _givePlayerCards() {
    for (let count = 1; count <= 5; count++) {
      for (const player of this.players) {
        const card = this.deck.pop();
        if (!card) {
          throw new Error("Deck seems empty");
        }
        player.cards.push(card);
      }
    }
  }

  private _showFirstCard() {
    const card = this.deck.pop();
    if (!card) {
      throw new Error("Deck seems empty");
    }
    this.playedCards.push(card);
  }

  addPlayer(player: Player): void {
    this.players.push(player);
  }

  playCard(card: Card): void {
    if (this.isCardPlayable(card)) {
      remove(this.currentPlayer.cards, card);
      this.playedCards.push(card);
      this._hasCurrentPlayerPlayedACard = true;
    } else {
      throw new Error("Card must have same type or color.");
    }
  }

  sayDuo(): void {
    this._hasCurrentPlayerSayedDuo = true;
  }

  endTurn(): void {
    if (!this.hasCurrentPlayerPlayedACard) {
      throw new Error();
    }

    if (
      this.currentPlayer.cards.length ===
        Game.NUMBER_OF_CARDS_WHEN_TO_SAY_DUO &&
      !this.hasCurrentPlayerSayedDuo
    ) {
      const card1 = this.deck.pop();
      if (!card1) {
        throw new Error("Deck seems empty");
      }
      const card2 = this.deck.pop();
      if (!card2) {
        throw new Error("Deck seems empty");
      }
      this.currentPlayer.cards.push(card1, card2);
    }

    if (this.currentPlayer.cards.length === 0) {
      this.winner = this.currentPlayer;
    } else {
      this._nextPlayer();

      if (lastItem(this.playedCards).type === Type.Draw2) {
        for (let count = 1; count <= 2; count++) {
          const card = this.deck.pop();
          if (!card) {
            throw new Error("Deck seems empty");
          }
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

  drawCard(): Card {
    const drawnCard = this.deck.pop();
    if (!drawnCard) {
      throw new Error("Deck seems empty");
    }
    if (this.deck.length === 0) {
      this._usePlayedCardsAsDeck();
    }
    return drawnCard;
  }

  _usePlayedCardsAsDeck(): void {
    const cards = shuffle(this.playedCards);
    this.playedCards = [];
    this.deck = cards;
  }

  isCardPlayable(card: Card): boolean {
    return card.type === this.card.type || card.color === this.card.color;
  }
}
