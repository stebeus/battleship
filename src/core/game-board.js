import { createMatrix } from '../helpers/matrix';
import { createFleet } from './ship.js';

class GameBoard {
  fleet = createFleet(4);
  grid = createMatrix(10, 10);

  #emptyCell = 0;
}

export { GameBoard };
