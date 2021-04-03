jest.mock('./shuffle/shuffle')

import Mock = jest.Mock

import { identity } from './function/identity'
import { Game } from './Game'
import { Player } from './Player'
import { shuffle } from './shuffle/shuffle'

class Bot extends Player {
  notifyOnceTurn() {
    this.playCard(this.pickCard())
  }

  pickCard() {
    return this.cards.find(
      card => this._game.isCardPlayable(card)
    )
  }
}

describe('bot', () => {
  beforeEach(() => {
    (shuffle as Mock).mockImplementation(identity)
  })

  it('plays duo', () => {
    const game = new Game()
    const bot1 = new Bot(game)
    const bot2 = new Bot(game)
    game.addPlayer(bot1)
    game.addPlayer(bot2)
    spyOn(bot1, 'notifyOnceTurn').and.callThrough()
    spyOn(bot1, 'playCard').and.callThrough()
    game.initialize()
    game.start()
    expect(bot1.notifyOnceTurn).toHaveBeenCalled()
    expect(bot1.playCard).toHaveBeenCalled()
  })

  describe('pickCard', () => {
    it('picks the card to play', () => {
      const game = new Game()
      const bot = new Bot(game)
      game.addPlayer(bot)
      game.initialize()
      const card = bot.pickCard()
      expect(game.isCardPlayable(card)).toEqual(true)
    })
  })
})
