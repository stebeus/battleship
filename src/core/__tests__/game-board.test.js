import { beforeEach, describe, expect, it } from "vitest";
import { createGrid } from "../../helpers/grid-helper";
import { GameBoard } from "../game-board";
import { Ship } from "../ship";

const gameBoard = new GameBoard();
const ship = new Ship(2);

describe("GameBoard.place", () => {
  beforeEach(() => {
    gameBoard.grid = createGrid(3, 3);
  });

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

  it("places ship horizontally", () => {
    gameBoard.place(5, 1, 1, "x");
    expect(gameBoard.grid).toStrictEqual(horizontalShip);
  });

  it("places ship vertically", () => {
    gameBoard.place(5, 1, 1, "y");
    expect(gameBoard.grid).toStrictEqual(verticalShip);
  });
});

describe("GameBoard.receiveAttack", () => {
  beforeEach(() => {
    gameBoard.grid[0] = [0, ship, ship];
  });

  describe("Hit shots", () => {
    it("registers hit shots", () => {
      gameBoard.receiveAttack(0, 1);
      expect(gameBoard.grid[0]).toStrictEqual([0, "h", ship]);
    });
  });
});
