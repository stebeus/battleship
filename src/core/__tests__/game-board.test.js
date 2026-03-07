import { beforeEach, describe, expect, it } from 'vitest';
import { GameBoard } from '../game-board.js';
import { createGrid } from '../grid.js';
import { Ship } from '../ship.js';

const gameBoard = new GameBoard();

describe('GameBoard.place', () => {
  describe('Valid placements', () => {
    beforeEach(() => {
      gameBoard.grid = createGrid(3, 3);
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

  describe('Invalid placements', () => {
    describe('When the grid space is insufficient', () => {
      beforeEach(() => {
        gameBoard.grid = createGrid(3, 3);
      });

      const emptyGrid = createGrid(3, 3);

      it('prevents placing ship horizontally', () => {
        gameBoard.place(4, 2, 2, 'x');
        expect(gameBoard.grid).toStrictEqual(emptyGrid);
      });

      it('prevents placing ship vertically', () => {
        gameBoard.place(4, 2, 2, 'y');
        expect(gameBoard.grid).toStrictEqual(emptyGrid);
      });
    });

    it('prevents placing ship on occupied cells', () => {
      // Arrange
      const ship = new Ship();

      const occupiedPlacement = [
        [0, 0, 0],
        [0, ship, 0],
        [0, 0, 0],
      ];

      gameBoard.grid = [
        [0, 0, 0],
        [0, ship, 0],
        [0, 0, 0],
      ];

      // Act
      gameBoard.place(5, 1, 1, 'y');

      // Assert
      expect(gameBoard.grid).toStrictEqual(occupiedPlacement);
    });

    describe('When placing ships adjacently', () => {
      describe('And when it is on sides', () => {
        describe('And when the existing ship is horizontal', () => {
          const ship = new Ship(2);

          const horizontalPlacement = [
            [0, 0, 0, 0],
            [0, ship, ship, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
          ];

          beforeEach(() => {
            gameBoard.grid = [
              [0, 0, 0, 0],
              [0, ship, ship, 0],
              [0, 0, 0, 0],
              [0, 0, 0, 0],
            ];
          });

          it.each`
            side        | row  | column
            ${'top'}    | ${0} | ${1}
            ${'bottom'} | ${2} | ${1}
            ${'left'}   | ${1} | ${0}
            ${'right'}  | ${1} | ${3}
          `('prevents placing ship on the $side', ({ row, column }) => {
            gameBoard.place(0, row, column, 'x');
            expect(gameBoard.grid).toStrictEqual(horizontalPlacement);
          });
        });

        describe('And when the existing ship is vertical', () => {
          const ship = new Ship(2);

          const verticalPlacement = [
            [0, 0, 0, 0],
            [0, ship, 0, 0],
            [0, ship, 0, 0],
            [0, 0, 0, 0],
          ];

          beforeEach(() => {
            gameBoard.grid = [
              [0, 0, 0, 0],
              [0, ship, 0, 0],
              [0, ship, 0, 0],
              [0, 0, 0, 0],
            ];
          });

          it.each`
            side        | row  | column
            ${'top'}    | ${0} | ${1}
            ${'bottom'} | ${3} | ${1}
            ${'left'}   | ${1} | ${0}
            ${'right'}  | ${1} | ${2}
          `('prevents placing ship on the $side', ({ row, column }) => {
            gameBoard.place(0, row, column, 'x');
            expect(gameBoard.grid).toStrictEqual(verticalPlacement);
          });
        });
      });

      describe('And when it is on corners', () => {
        const ship = new Ship();

        const occupiedPlacement = [
          [0, 0, 0],
          [0, ship, 0],
          [0, 0, 0],
        ];

        beforeEach(() => {
          gameBoard.grid = [
            [0, 0, 0],
            [0, ship, 0],
            [0, 0, 0],
          ];
        });

        it.each`
          corner            | row  | column
          ${'top left'}     | ${0} | ${0}
          ${'top right'}    | ${0} | ${2}
          ${'bottom left'}  | ${2} | ${0}
          ${'bottom right'} | ${2} | ${2}
        `('prevents placing ship on the $corner', ({ row, column }) => {
          gameBoard.place(0, row, column, 'x');
          expect(gameBoard.grid).toStrictEqual(occupiedPlacement);
        });
      });
    });
  });
});

describe('GameBoard.receiveAttack', () => {
  describe('Valid attacks', () => {
    let ship;

    beforeEach(() => {
      ship = new Ship(2);
      gameBoard.grid[0] = [0, ship, ship];
    });

    describe('When a shot is hit', () => {
      it('registers hit shots', () => {
        gameBoard.receiveAttack(0, 1);
        expect(gameBoard.grid[0]).toStrictEqual([0, 'h', ship]);
      });

      it('reduces the targeted ship health', () => {
        gameBoard.receiveAttack(0, 1);
        expect(ship.health).toBe(1);
      });
    });

    it('registers missed shots', () => {
      gameBoard.receiveAttack(0, 0);
      expect(gameBoard.grid[0]).toStrictEqual(['m', ship, ship]);
    });
  });

  describe('Invalid attacks', () => {
    const ship = new Ship(2);

    beforeEach(() => {
      gameBoard.grid[0] = ['m', 'h', ship];
    });

    it('does not alter registered missed shots', () => {
      gameBoard.receiveAttack(0, 0);
      expect(gameBoard.grid[0]).toStrictEqual(['m', 'h', ship]);
    });

    it('does not alter registered hit shots', () => {
      gameBoard.receiveAttack(0, 1);
      expect(gameBoard.grid[0]).toStrictEqual(['m', 'h', ship]);
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
    gameBoard.grid = createGrid(3, 3);
    expect(gameBoard.isFleetSunk()).toBeTruthy();
  });
});
