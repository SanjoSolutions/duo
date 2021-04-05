import { values } from "./values";

describe("values", () => {
  it("returns the values of the enum", () => {
    enum Test {
      A = 1,
      B = 2,
    }

    expect(values(Test)).toEqual([1, 2]);
  });
});
