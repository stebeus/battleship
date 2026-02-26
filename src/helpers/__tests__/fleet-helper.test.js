import { describe, expect, it } from 'vitest';
import { createDivision, createFleet } from '../fleet-helper.js';

describe('createDivision', () => {
  describe('Default behavior', () => {
    const division = createDivision();

    it('creates a division of 1 ship', () => {
      expect(division).toHaveLength(1);
    });

    it('has a ship of length 1', () => {
      expect(division[0]).toHaveLength(1);
    });
  });

  it('creates a division of 5 ships', () => {
    const division = createDivision(5);
    expect(division).toHaveLength(5);
  });

  it('only has ships of length 5', () => {
    // Arrange
    const division = createDivision(5, 5);

    // Act
    const isShipLengthFive = (ship) => ship.length === 5;

    // Assert
    expect(division.every(isShipLengthFive)).toBeTruthy();
  });
});

describe('createFleet', () => {
  it('creates a fleet with no subarrays', () => {
    // Arrange
    const fleet = createFleet(5);

    // Act
    const isArray = (division) => Array.isArray(division);

    // Assert
    expect(fleet.every(isArray)).toBeFalsy();
  });
});
