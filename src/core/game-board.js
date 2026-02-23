import { createFleet } from "../helpers/fleet-helper";
import { createGrid } from "../helpers/grid-helper";
import { Ship } from "./ship";

class GameBoard {
  #empty = 0;

  constructor() {
    this.fleet = createFleet(4);
    this.grid = createGrid(10, 10);
  }

  #isCellEmpty(row, column) {
    const cell = this.grid[row][column];
    return cell === this.#empty;
  }

  place(shipIndex, row, column, axis) {
    const ship = this.fleet[shipIndex];

    for (let cell = 0; cell < ship.length; cell++) {
      if (axis === "x") this.grid[row][column++] = ship;
      if (axis === "y") this.grid[row++][column] = ship;
    }
  }

  receiveAttack(row, column) {
    const cell = this.grid[row][column];
    const miss = "m";
    const hit = "h";

    if (this.#isCellEmpty(row, column)) this.grid[row][column] = miss;

    if (cell instanceof Ship) {
      this.grid[row][column] = hit;
      cell.hit();
    }
  }
}

export { GameBoard };
