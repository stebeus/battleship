import { expect, it } from "vitest";
import { createGrid } from "../grid-helper";

const grid = createGrid(10, 9);

it("creates a grid with 10 rows", () => {
  expect(grid).toHaveLength(10);
});

it("creates a grid with 9 columns", () => {
  expect(grid[0]).toHaveLength(9);
});

it("empty cells are represented as 0", () => {
  // Arrange
  const isEmptyCellZero = (cell) => cell === 0;

  // Act
  const checkRow = (row) => row.every(isEmptyCellZero);

  // Assert
  expect(grid.every(checkRow)).toBeTruthy();
});
