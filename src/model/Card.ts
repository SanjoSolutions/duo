import { Color } from "./Color.js";
import { Type } from "./Type.js";

export class Card {
  type: Type;
  color: Color;

  constructor(type: Type, color: Color) {
    this.type = type;
    this.color = color;
  }
}
