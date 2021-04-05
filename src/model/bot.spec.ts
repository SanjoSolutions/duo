jest.mock("./shuffle/shuffle.js");

import Mock = jest.Mock;

import { Card } from "./Card.js";
import { identity } from "../lib/function/identity.js";
import { Game } from "./Game.js";
import { Player } from "./Player.js";
import { shuffle } from "../lib/shuffle/shuffle.js";

class Bot extends Player {
  notifyOnceTurn() {
    const card = this.pickCard();
    if (card) {
      this.playCard(card);
    }
  }

  pickCard(): Card | undefined {
    return this.cards.find((card) => this._game.isCardPlayable(card));
  }
}

describe("bot", () => {
  beforeEach(() => {
    (shuffle as Mock).mockImplementation(identity);
  });

  it("plays duo", () => {
    const game = new Game();
    const bot1 = new Bot(game);
    const bot2 = new Bot(game);
    game.addPlayer(bot1);
    game.addPlayer(bot2);
    spyOn(bot1, "notifyOnceTurn").and.callThrough();
    spyOn(bot1, "playCard").and.callThrough();
    game.initialize();
    game.start();
    expect(bot1.notifyOnceTurn).toHaveBeenCalled();
    expect(bot1.playCard).toHaveBeenCalledWith(expect.any(Card));
  });

  describe("pickCard", () => {
    it("picks the card to play", () => {
      const game = new Game();
      const bot = new Bot(game);
      game.addPlayer(bot);
      game.initialize();
      const card = bot.pickCard()!;
      expect(game.isCardPlayable(card)).toEqual(true);
    });
  });
});
