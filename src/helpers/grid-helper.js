function createGrid(rows, columns) {
  const grid = [];
  const cell = 0;

  for (let row = 0; row < rows; row++) {
    grid[row] = [];
    for (let column = 0; column < columns; column++) {
      grid[row][column] = cell;
    }
  }

  return grid;
}

export { createGrid };
