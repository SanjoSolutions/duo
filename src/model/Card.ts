import { Color } from "./Color";
import { Type } from "./Type";

export class Card {
  type: Type;
  color: Color;

  constructor(type: Type, color: Color) {
    this.type = type;
    this.color = color;
  }
}
