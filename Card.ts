import { Color } from './Color'
import { Symbol } from './Symbol'

export class Card {
  symbol: Symbol
  color: Color

  constructor(symbol: Symbol, color: Color) {
    this.symbol = symbol
    this.color = color
  }
}
