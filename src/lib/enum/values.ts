import { Enum } from "./Enum.js";

export function values(enumeration: Enum): (string | number)[] {
  return Object.entries(enumeration)
    .filter(([key]) => Number.isNaN(Number(key)))
    .map((tuple) => tuple[1]);
}
