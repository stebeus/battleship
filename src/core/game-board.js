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
    const miss = 'm';
    const hit = 'h';

    if (this.#isCellEmpty(row, column)) this.grid[row][column] = miss;

    if (this.#isCellShip(row, column)) {
      const ship = this.grid[row][column];

      this.grid[row][column] = hit;
      ship.hit();
    }
  }

  isFleetSunk() {
    const isCellNotShip = (cell) => !(cell instanceof Ship);
    const checkRow = (row) => row.every(isCellNotShip);
    return this.grid.every(checkRow);
  }

  #isCellOutOfBounds(row, column) {
    const gridRow = this.grid[row];
    const gridColumn = gridRow?.[column];
    return gridRow == null || gridColumn == null;
  }

  #isCellEmpty(row, column) {
    const cell = this.grid[row]?.[column];
    return cell === this.#emptyCell;
  }

  #isCellShip(row, column) {
    const cell = this.grid[row]?.[column];
    return cell instanceof Ship;
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

  #getAdjacentCoordinates(row, column, ...sliceOptions) {
    const sides = this.#getAdjacentSides(row, column);
    const corners = this.#getAdjacentCorners(row, column);

    const coordinates = [...sides, ...corners];

    return coordinates.slice(...sliceOptions);
  }

  #hasAdjacentShip(row, column, ...sliceOptions) {
    const coordinates = this.#getAdjacentCoordinates(
      row,
      column,
      ...sliceOptions,
    );

    for (const [row, column] of coordinates) {
      if (this.#isCellShip(row, column)) return true;
    }
  }

  #validatePlacement({ length }, row, column, axis) {
    const isPrecededByShip = this.#hasAdjacentShip(row, column, 0, 2);
    if (isPrecededByShip) return;

    for (let cell = 0; cell < length; cell++) {
      const validators = [
        this.#isCellOutOfBounds(row, column),
        !this.#isCellEmpty(row, column),
        this.#hasAdjacentShip(row, column, 2),
      ];

      for (const validator of validators) if (validator) return;

      if (axis === 'x') column++;
      if (axis === 'y') row++;
    }

    return true;
  }
}

export { GameBoard };
