import { beforeEach, describe, expect, it } from 'vitest';
import { createMatrix } from '../../helpers/matrix.js';
import { GameBoard } from '../game-board.js';
import { Ship } from '../ship.js';

const gameBoard = new GameBoard();

describe('GameBoard.place', () => {
  describe('Given valid placements,', () => {
    beforeEach(() => {
      gameBoard.grid = createMatrix(3, 3);
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

    it('places ship vertically', () => {
      // Arrange
      const verticalPlacement = [
        [0, 0, 0],
        [0, ship, 0],
        [0, ship, 0],
      ];

      // Act
      gameBoard.place(4, 1, 1, 'y');

      // Assert
      expect(gameBoard.grid).toStrictEqual(verticalPlacement);
    });
  });

  describe('Given invalid placements,', () => {});
});

describe('GameBoard.receiveAttack', () => {
  describe('Given valid attacks,', () => {
    let ship;

    beforeEach(() => {
      ship = new Ship(2);
      gameBoard.grid[0] = [0, ship, ship];
    });

    describe('When a shot is hit', () => {
      it('registers hit shots', () => {
        gameBoard.receiveAttack(0, 1);
        expect(gameBoard.grid[0]).toStrictEqual([0, 'hit', ship]);
      });

      it('reduces the target health', () => {
        gameBoard.receiveAttack(0, 1);
        expect(ship.health).toBe(1);
      });
    });

    it('registers missed shots', () => {
      gameBoard.receiveAttack(0, 0);
      expect(gameBoard.grid[0]).toStrictEqual(['miss', ship, ship]);
    });
  });

  describe('Given invalid attacks,', () => {
    const ship = new Ship(2);

    beforeEach(() => {
      gameBoard.grid[0] = ['miss', 'hit', ship];
    });

    it('does not alter missed shots', () => {
      gameBoard.receiveAttack(0, 0);
      expect(gameBoard.grid[0]).toStrictEqual(['miss', 'hit', ship]);
    });

    it('does not alter hit shots', () => {
      gameBoard.receiveAttack(0, 1);
      expect(gameBoard.grid[0]).toStrictEqual(['miss', 'hit', ship]);
    });
  });
});

describe('GameBoard.isFleetSunk', () => {
  it('confirms that the fleet is not sunk', () => {
    const ship = new Ship();

    gameBoard.grid = [
      [0, 0, 0],
      [0, ship, 0],
      [0, 0, 0],
    ];

    expect(gameBoard.isFleetSunk()).toBeFalsy();
  });

  it('confirms that the fleet is sunk', () => {
    gameBoard.grid = createMatrix(3, 3);
    expect(gameBoard.isFleetSunk()).toBeTruthy();
  });
});
