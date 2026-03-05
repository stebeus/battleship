import { createFleet } from '../helpers/fleet-helper.js';
import { createGrid } from '../helpers/grid-helper.js';
import { Ship } from './ship.js';

class GameBoard {
  fleet = createFleet(4);
  grid = createGrid(10, 10);

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
    const cell = this.grid[row][column];
    const miss = 'm';
    const hit = 'h';

    if (this.#isCellEmpty(row, column)) this.grid[row][column] = miss;

    if (cell instanceof Ship) {
      this.grid[row][column] = hit;
      cell.hit();
    }
  }

  isFleetSunk() {
    const isNotShip = (cell) => !(cell instanceof Ship);
    const checkRow = (row) => row.every(isNotShip);
    return this.grid.every(checkRow);
  }

  #isCellOutOfBounds(row, column) {
    const gridRow = this.grid[row];
    const gridColumn = gridRow?.[column];
    return gridRow == null || gridColumn == null;
  }

  #isCellEmpty(row, column) {
    const cell = this.grid[row][column];
    return cell === this.#emptyCell;
  }

  #isCellAdjacentShip(row, column) {
    const cell = this.grid[row]?.[column];
    return cell instanceof Ship;
  }

  #validatePlacement(ship, row, column, axis) {
    // Pre
    const previousHor = [row, column - 1];
    const previousVer = [row - 1, column];
    const sides = [previousHor, previousVer];

    for (const [row, column] of sides) {
      if (this.#isCellAdjacentShip(row, column)) return false;
    }

    for (let cell = 0; cell < ship.length; cell++) {
      const topLeft = [row - 1, column - 1];
      const topRight = [row - 1, column + 1];
      const bottomLeft = [row + 1, column - 1];
      const bottomRight = [row + 1, column + 1];
      const horizontal = [row, column + 1];
      const vertical = [row + 1, column];

      const sides = [
        topLeft,
        topRight,
        bottomLeft,
        bottomRight,
        horizontal,
        vertical,
      ];

      for (const [row, column] of sides) {
        if (this.#isCellAdjacentShip(row, column)) return false;
      }

      if (
        this.#isCellOutOfBounds(row, column) ||
        !this.#isCellEmpty(row, column)
      ) {
        return false;
      }

      if (axis === 'x') column++;
      if (axis === 'y') row++;
    }

    return true;
  }
}

export { GameBoard };
