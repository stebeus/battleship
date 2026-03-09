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

  isCellOfType(row, column, cellType) {
    const cell = this.grid[row]?.[column];
    return cell === cellType;
  }

  isCellShip(row, column) {
    const cell = this.grid[row]?.[column];
    return cell instanceof Ship;
  }

  receiveAttack(row, column) {
    const MISS = 'miss';
    const HIT = 'hit';

    const cell = this.grid[row][column];

    if (this.isCellOfType(row, column, this.#emptyCell)) {
      this.grid[row][column] = MISS;
    }

    if (this.isCellShip(row, column)) {
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

  #getAdjacentSides(row, column) {
    const top = [row - 1, column];
    const left = [row, column - 1];
    const bottom = [row + 1, column];
    const right = [row, column + 1];

    return [top, left, bottom, right];
  }

  #getAdjacentCorners(row, column) {
    const topLeft = [row - 1, column - 1];
    const topRight = [row - 1, column + 1];
    const bottomLeft = [row + 1, column - 1];
    const bottomRight = [row + 1, column + 1];

    return [topLeft, topRight, bottomLeft, bottomRight];
  }

  #getAdjacentCoordinates(row, column) {
    const sides = this.#getAdjacentSides(row, column);
    const corners = this.#getAdjacentCorners(row, column);

    const coordinates = [...sides, ...corners];

    return coordinates;
  }

  #hasAdjacentShip(row, column) {
    const coordinates = this.#getAdjacentCoordinates(row, column);

    for (const [row, column] of coordinates) {
      if (this.isCellShip(row, column)) return true;
    }
  }

  #validatePlacement({ length }, row, column, axis) {
    for (let cell = 0; cell < length; cell++) {
      if (
        this.#isCellOutOfBounds(row, column) ||
        !this.isCellOfType(row, column, this.#emptyCell) ||
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
