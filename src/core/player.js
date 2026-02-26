import { GameBoard } from './game-board.js';

class Player {
  constructor(name) {
    this.name = name;
    this.gameBoard = new GameBoard();
  }
}

export { Player };
