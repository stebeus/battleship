function createGrid(rows) {
  const grid = [];

  for (let row = 0; row < rows; row++) {
    grid[row] = [];
  }

  return grid;
}

export { createGrid };
