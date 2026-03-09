import { createMatrix } from '../helpers/matrix';
import { createFleet } from './ship.js';

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
}

export { GameBoard };
