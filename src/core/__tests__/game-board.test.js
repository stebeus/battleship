import { beforeEach, describe } from 'vitest';
import { GameBoard } from '../game-board.js';

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
  });
});
