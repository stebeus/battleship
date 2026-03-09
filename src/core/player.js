import { GameBoard } from './game-board.js';

class Player {
  static of(...names) {
    return names.map((name) => new Player(name));
  }

  gameBoard = new GameBoard();

  constructor(name) {
    this.name = name;
  }
}

export { Player };
