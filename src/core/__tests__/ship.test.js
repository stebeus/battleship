import { beforeEach, expect, it } from "vitest";
import { Ship } from "../ship";

let ship;

beforeEach(() => {
  ship = new Ship();
});

it("creates a ship of length 1 by default", () => {
  expect(ship).toHaveLength(1);
});
