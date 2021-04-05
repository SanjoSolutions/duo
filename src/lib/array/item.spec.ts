import { item } from "./item";

describe("item", () => {
  test("returns the item with the index. with negative index starting from right.", () => {
    const values = [1, 2];
    expect(item(values, -1)).toEqual(2);
  });
});
