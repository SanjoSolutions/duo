jest.mock("./randomInteger.js");

import Mock = jest.Mock;
import { randomInteger } from "./randomInteger";
import { shuffle } from "./shuffle";

describe("shuffle", () => {
  it("shuffles", () => {
    (randomInteger as Mock)
      .mockReturnValueOnce(1)
      .mockReturnValueOnce(1)
      .mockReturnValueOnce(0);
    const values = [1, 2, 3];
    expect(shuffle(values)).toEqual([2, 3, 1]);
  });
});
