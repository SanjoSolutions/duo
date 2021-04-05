import { lastItem } from "./lastItem";

describe("lastItem", () => {
  it("returns the last item", () => {
    const values = [1, 2];
    expect(lastItem(values)).toEqual(2);
  });
});
