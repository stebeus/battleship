import { beforeEach, describe, expect, it } from "vitest";
import { Ship } from "../ship";

let ship;

beforeEach(() => {
  ship = new Ship();
});

it("creates a ship of length 1 by default", () => {
  expect(ship).toHaveLength(1);
});

describe("Ship.isSunk", () => {
  it("confirms if ship is not sunk", () => {
    expect(ship.isSunk()).toBeFalsy();
  });

  it("confirms if ship is sunk", () => {
    ship.health = 0;
    expect(ship.isSunk()).toBeTruthy();
  });
});

describe("Ship.hit", () => {
  it("reduces ship health by 1 hit", () => {
    // Arrange
    ship.health = 3;

    // Act
    ship.hit();

    // Assert
    expect(ship.health).toBe(2);
  });

  it("stops reducing ship health when it is 0", () => {
    // Arrange
    ship.health = 0;

    // Act
    ship.hit();

    // Assert
    expect(ship.health).toBe(0);
  });
});
