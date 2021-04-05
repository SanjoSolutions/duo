import { randomInteger } from "./randomInteger";

export function randomIndex<T>(values: T[]): number {
  return randomInteger(0, values.length - 1);
}
