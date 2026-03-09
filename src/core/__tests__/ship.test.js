import { describe, expect, it } from 'vitest';
import { createFleet, Ship } from '../ship.js';

describe('Ship', () => {
  it('rejects inputs that are not positive integers', () => {
    expect(() => new Ship(0)).toThrowError();
  });

  it('has length one by default', () => {
    const ship = new Ship();
    expect(ship).toHaveLength(1);
  });

  describe('Ship.isSunk', () => {
    it('confirms if ship is not sunk', () => {
      const ship = new Ship();
      expect(ship.isSunk()).toBeFalsy;
    });

    it('confirms if ship not sunk', () => {
      const ship = new Ship();
      ship.health = 0;

      expect(ship.isSunk()).toBeFalsy;
    });
  });

  describe('Ship.hit', () => {
    it('reduces ship health by one', () => {
      // Arrange
      const ship = new Ship(2);

      // Act
      ship.hit();

      // Assert
      expect(ship.health).toBe(1);
    });

    it('stops reducing ship health when it is zero', () => {
      // Arrange
      const ship = new Ship();
      ship.health = 0;

      // Act
      ship.hit();

      // Assert
      expect(ship.health).toBe(0);
    });
  });
});

describe('createFleet', () => {
  it('rejects inputs that are not positive integers', () => {
    expect(() => createFleet(0)).toThrowError();
  });

  it('creates one ship by default', () => {
    const fleet = createFleet();
    expect(fleet).toHaveLength(1);
  });

  it('creates no subarrays', () => {
    const fleet = createFleet(2);

    const isArray = (ship) => Array.isArray(ship);

    expect(fleet.some(isArray)).toBeFalsy();
  });
});
