import { randomInteger } from "./randomInteger.js";

export function randomIndex<T>(values: T[]): number {
  return randomInteger(0, values.length - 1);
}
