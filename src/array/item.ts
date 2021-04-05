export function item<T>(values: T[], index: number): T {
  return values[values.length + index]
}
