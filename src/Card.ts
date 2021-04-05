import { Color } from './Color.js'
import { Symbol } from './Symbol.js'

export class Card {
  symbol: Symbol
  color: Color

  constructor(symbol: Symbol, color: Color) {
    this.symbol = symbol
    this.color = color
  }
}
