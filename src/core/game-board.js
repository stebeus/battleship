import { createMatrix } from '../helpers/matrix.js';
import { createFleet, Ship } from './ship.js';

class GameBoard {
  fleet = createFleet(4);
  grid = createMatrix(10, 10);

  #emptyCell = 0;

  place(shipIndex, row, column, axis) {
    const ship = this.fleet[shipIndex];

    const isPlacementValid = this.#validatePlacement(ship, row, column, axis);
    if (!isPlacementValid) return;

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

  #getAdjacentCorners(row, column) {
    const topLeft = [row - 1, column - 1];
    const topRight = [row - 1, column + 1];
    const bottomLeft = [row + 1, column - 1];
    const bottomRight = [row + 1, column + 1];

    return [topLeft, topRight, bottomLeft, bottomRight];
  }

  #hasAdjacentShip(row, column) {
    const corners = this.#getAdjacentCorners(row, column);

    for (const [row, column] of corners) {
      const cell = this.grid[row]?.[column];
      if (cell instanceof Ship) return true;
    }
  }

  #validatePlacement({ length }, row, column, axis) {
    for (let cell = 0; cell < length; cell++) {
      if (
        this.#isCellOutOfBounds(row, column) ||
        this.grid[row][column] !== this.#emptyCell ||
        this.#hasAdjacentShip(row, column)
      ) {
        return;
      }

      if (axis === 'x') column++;
      if (axis === 'y') row++;
    }

    return true;
  }
}

export { GameBoard };
