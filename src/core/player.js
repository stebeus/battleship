import { GameBoard } from './game-board.js';

class Player {
  gameBoard = new GameBoard();

  constructor(name) {
    this.name = name;
  }
}

export { Player };
