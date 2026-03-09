import { beforeEach, describe } from 'vitest';
import { GameBoard } from '../game-board.js';
import { Ship } from '../ship.js';

const gameBoard = new GameBoard();

describe('GameBoard.place', () => {
  describe('Given valid placements,', () => {
    beforeEach(() => {
      gameBoard.grid = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
      ];
    });

    const ship = new Ship(2);
  });
});
