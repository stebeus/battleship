import { expect, it } from "vitest";
import { createGrid } from "../grid-helper";

const grid = createGrid(10, 9);

it("creates a grid with 10 rows", () => {
  expect(grid).toHaveLength(10);
});

it("creates a grid with 9 columns", () => {
  expect(grid[0]).toHaveLength(9);
});
