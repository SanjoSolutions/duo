import Mock = jest.Mock;

jest.mock("./randomIndex.js");

import { randomIndex } from "./randomIndex.js";
import { spliceRandomItem } from "./spliceRandomItem.js";

describe("spliceRandomItem", () => {
  test("splices a random item", () => {
    const values = [1, 2];
    (randomIndex as Mock).mockReturnValue(1);
    const value = spliceRandomItem(values);
    expect(value).toEqual(2);
    expect(values).toEqual([1]);
  });
});
