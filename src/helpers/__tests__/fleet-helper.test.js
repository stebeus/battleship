import { describe, expect, it } from "vitest";
import { createDivision } from "../fleet-helper";

describe("createDivision", () => {
  describe("Default behavior", () => {
    const division = createDivision();

    it("creates a division of 1 ship", () => {
      expect(division).toHaveLength(1);
    });

    it("has a ship of length 1", () => {
      expect(division[0]).toHaveLength(1);
    });
  });

  it("creates a division of 5 ships", () => {
    const division = createDivision(5);
    expect(division).toHaveLength(5);
  });

  it("only has ships of length 5", () => {
    // Arrange
    const division = createDivision(5, 5);

    // Act
    const isShipLengthFive = (ship) => ship.length === 5;

    // Assert
    expect(division.every(isShipLengthFive)).toBeTruthy();
  });
});
