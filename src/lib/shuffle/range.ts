export function range(from: number, to: number): number[] {
  const values = new Array(to - from + 1);
  let index = 0;
  for (let value = from; value <= to; value++) {
    values[index] = value;
    index++;
  }
  return values;
}
