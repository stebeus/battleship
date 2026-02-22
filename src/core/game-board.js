import { createFleet } from "../helpers/fleet-helper";
import { createGrid } from "../helpers/grid-helper";

class GameBoard {
  constructor() {
    this.fleet = createFleet(4);
    this.grid = createGrid(10, 10);
  }

  place(shipIndex, row, column, axis) {
    const ship = this.fleet[shipIndex];

    for (let cell = 0; cell < ship.length; cell++) {
      if (axis === "x") this.grid[row][column++] = ship;
      if (axis === "y") this.grid[row++][column] = ship;
    }
  }
}

export { GameBoard };
