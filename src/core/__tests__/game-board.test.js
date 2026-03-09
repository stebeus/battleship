import { beforeEach, describe, expect, it } from 'vitest';
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

    it('places ship horizontally', () => {
      // Arrange
      const horizontalPlacement = [
        [0, 0, 0],
        [0, ship, ship],
        [0, 0, 0],
      ];

      // Act
      gameBoard.place(4, 1, 1, 'x');

      // Assert
      expect(gameBoard.grid).toStrictEqual(horizontalPlacement);
    });
  });
});
