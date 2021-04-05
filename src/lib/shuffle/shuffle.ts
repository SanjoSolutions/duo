import { spliceRandomItem } from "./spliceRandomItem";

export function shuffle<T>(values: T[]): T[] {
  const result = [];
  values = Array.from(values);
  while (values.length >= 1) {
    const item = spliceRandomItem(values);
    result.push(item);
  }
  return result;
}
