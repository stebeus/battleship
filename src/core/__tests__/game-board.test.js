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
});
