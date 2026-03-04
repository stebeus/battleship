import { createFleet } from '../helpers/fleet-helper.js';
import { createGrid } from '../helpers/grid-helper.js';
import { Ship } from './ship.js';

class GameBoard {
  fleet = createFleet(4);
  grid = createGrid(10, 10);

  #empty = 0;

  place(shipIndex, row, column, axis) {
    const ship = this.fleet[shipIndex];

    const isPlacementValid = this.#validatePlacement(ship, row, column, axis);
    if (!isPlacementValid) return;

    for (let cell = 0; cell < ship.length; cell++) {
      if (axis === 'x') this.grid[row][column++] = ship;
      if (axis === 'y') this.grid[row++][column] = ship;
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

  #isCellEmpty(row, column) {
    const cell = this.grid[row][column];
    return cell === this.#empty;
  }

  #isCellOutOfBounds(row, column) {
    const gridRow = this.grid[row];
    const gridColumn = gridRow?.[column];
    return gridRow == null || gridColumn == null;
  }

  #isShip(row, column) {
    const grid = this.grid;
    if (
      grid[row - 1]?.[column - 1] instanceof Ship ||
      grid[row + 1]?.[column - 1] instanceof Ship ||
      grid[row - 1]?.[column + 1] instanceof Ship ||
      grid[row + 1]?.[column + 1] instanceof Ship
    ) {
      return true;
    }
  }

  #validatePlacement(ship, row, column, axis) {
    for (let cell = 0; cell < ship.length; cell++) {
      if (
        this.#isCellOutOfBounds(row, column) ||
        !this.#isCellEmpty(row, column) ||
        this.#isShip(row, column)
      ) {
        return false;
      }

      if (axis === 'x') this.grid[row][column++];
      if (axis === 'y') this.grid[row++][column];
    }

    return true;
  }
}

export { GameBoard };
