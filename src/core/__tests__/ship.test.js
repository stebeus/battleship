import { beforeEach, describe, expect, it } from "vitest";
import { Ship } from "../ship";

it("creates a ship of length 1 by default", () => {
  const ship = new Ship();
  expect(ship).toHaveLength(1);
});

describe("Ship.isSunk", () => {
  let ship;

  beforeEach(() => {
    ship = new Ship();
  });

  it("confirms that the ship is not sunk", () => {
    expect(ship.isSunk()).toBeFalsy();
  });

  it("confirms that the ship is sunk", () => {
    ship.health = 0;
    expect(ship.isSunk()).toBeTruthy();
  });
});

describe("Ship.hit", () => {
  it("reduces the ship health by 1 hit", () => {
    // Arrange
    const ship = new Ship(3);

    // Act
    ship.hit();

    // Assert
    expect(ship.health).toBe(2);
  });

  it("stops reducing the ship health when it is 0", () => {
    // Arrange
    const ship = new Ship(0);

    // Act
    ship.hit();

    // Assert
    expect(ship.health).toBe(0);
  });
});
