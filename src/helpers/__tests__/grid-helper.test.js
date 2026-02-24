import { expect, it } from "vitest";
import { createGrid } from "../grid-helper";

const grid = createGrid(10, 9);

it("creates a 10 row grid", () => {
  expect(grid).toHaveLength(10);
});

it("creates a 9 column grid", () => {
  expect(grid[0]).toHaveLength(9);
});

it("represents empty cells as 0", () => {
  // Arrange
  const isEmptyCellZero = (cell) => cell === 0;

  // Act
  const checkRow = (row) => row.every(isEmptyCellZero);

  // Assert
  expect(grid.every(checkRow)).toBeTruthy();
});
