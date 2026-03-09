import { createMatrix } from '../helpers/matrix.js';
import { createFleet, Ship } from './ship.js';

class GameBoard {
  fleet = createFleet(4);
  grid = createMatrix(10, 10);

  #emptyCell = 0;

  place(shipIndex, row, column, axis) {
    const ship = this.fleet[shipIndex];

    for (let cell = 0; cell < ship.length; cell++) {
      this.grid[row][column] = ship;

      if (axis === 'x') column++;
      if (axis === 'y') row++;
    }
  }

  receiveAttack(row, column) {
    const MISS = 'miss';
    const HIT = 'hit';

    const cell = this.grid[row][column];

    if (cell === this.#emptyCell) this.grid[row][column] = MISS;

    if (cell instanceof Ship) {
      this.grid[row][column] = HIT;
      cell.hit();
    }
  }

  isFleetSunk() {
    const isCellSunk = (cell) => !(cell instanceof Ship);
    const checkRow = (row) => row.every(isCellSunk);
    return this.grid.every(checkRow);
  }

  #isCellOutOfBounds(row, column) {
    const gridRow = this.grid[row];
    const gridColumn = gridRow?.[column];
    return gridRow == null || gridColumn == null;
  }
}

export { GameBoard };
