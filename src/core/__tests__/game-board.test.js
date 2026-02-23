import { beforeEach, describe, expect, it } from "vitest";
import { createGrid } from "../../helpers/grid-helper";
import { GameBoard } from "../game-board";
import { Ship } from "../ship";

const gameBoard = new GameBoard();

describe("GameBoard.place", () => {
  beforeEach(() => {
    gameBoard.grid = createGrid(3, 3);
  });

  const ship = new Ship(2);

  const horizontalPlacement = [
    [0, 0, 0],
    [0, ship, ship],
    [0, 0, 0],
  ];

  const verticalPlacement = [
    [0, 0, 0],
    [0, ship, 0],
    [0, ship, 0],
  ];

  describe("Valid placements", () => {
    it("places ship horizontally", () => {
      gameBoard.place(5, 1, 1, "x");
      expect(gameBoard.grid).toStrictEqual(horizontalPlacement);
    });

    it("places ship vertically", () => {
      gameBoard.place(5, 1, 1, "y");
      expect(gameBoard.grid).toStrictEqual(verticalPlacement);
    });
  });

  describe("Invalid placements", () => {
    it("does not place ship on occupied cells", () => {
      // Arrange
      gameBoard.grid = [
        [0, 0, 0],
        [0, ship, ship],
        [0, 0, 0],
      ];

      // Act
      gameBoard.place(5, 1, 1, "y");

      // Assert
      expect(gameBoard.grid).toStrictEqual(horizontalPlacement);
    });
  });
});

describe("GameBoard.receiveAttack", () => {
  let ship;

  beforeEach(() => {
    ship = new Ship(2);
    gameBoard.grid[0] = [0, ship, ship];
  });

  describe("Hit shots", () => {
    it("registers hit shots", () => {
      gameBoard.receiveAttack(0, 1);
      expect(gameBoard.grid[0]).toStrictEqual([0, "h", ship]);
    });

    it("reduces the targeted ship health", () => {
      gameBoard.receiveAttack(0, 1);
      expect(ship.health).toBe(1);
    });
  });

  it("registers missed shots", () => {
    gameBoard.receiveAttack(0, 0);
    expect(gameBoard.grid[0]).toStrictEqual(["m", ship, ship]);
  });

  it("does not alter registered shots", () => {
    // Arrange
    gameBoard.grid[0] = ["m", "h", ship];

    // Act
    gameBoard.receiveAttack(0, 0);
    gameBoard.receiveAttack(0, 1);

    // Assert
    expect(gameBoard.grid[0]).toStrictEqual(["m", "h", ship]);
  });
});

describe("GameBoard.isFleetSunk", () => {
  it("confirms if fleet is not sunk", () => {
    const ship = new Ship(2);

    gameBoard.grid = [
      [0, ship, ship, 0],
      [0, 0, 0, 0],
      [0, 0, ship, 0],
      [0, 0, ship, 0],
    ];

    expect(gameBoard.isFleetSunk()).toBeFalsy();
  });

  it("confirms if fleet is sunk", () => {
    gameBoard.grid = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];

    expect(gameBoard.isFleetSunk()).toBeTruthy();
  });
});
