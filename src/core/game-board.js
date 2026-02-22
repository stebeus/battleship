import { createFleet } from "../helpers/fleet-helper";
import { createGrid } from "../helpers/grid-helper";

class GameBoard {
  constructor() {
    this.fleet = createFleet(4);
    this.grid = createGrid(10, 10);
  }
}

export { GameBoard };
