import { range } from "./range";

describe("range", () => {
  test("returns a range from inclusive to inclusive", () => {
    expect(range(1, 2)).toEqual([1, 2]);
  });
});
