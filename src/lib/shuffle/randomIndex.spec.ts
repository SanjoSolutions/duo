import { CLOSE_TO_MAXIMUM_RANDOM_RETURN_VALUE } from "./closeToMaximumRandomReturnValue.js";
import { randomIndex } from "./randomIndex.js";

describe("randomIndex", () => {
  test("maximum value", () => {
    jest
      .spyOn(Math, "random")
      .mockReturnValue(CLOSE_TO_MAXIMUM_RANDOM_RETURN_VALUE);
    const values = ["a", "b"];
    expect(randomIndex(values)).toEqual(1);
  });

  test("minimum value", () => {
    jest.spyOn(Math, "random").mockReturnValue(0);
    const values = ["a", "b"];
    expect(randomIndex(values)).toEqual(0);
  });
});
