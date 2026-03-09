import { describe, expect, it } from 'vitest';
import { createFleet, Ship } from '../ship.js';

describe('Ship', () => {
  describe('Invalid inputs', () => {
    it('rejects non-integers', () => {
      expect(() => new Ship('1')).toThrowError();
    });

    it('rejects numbers less than one', () => {
      expect(() => new Ship(0)).toThrowError();
    });
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
  describe('Invalid inputs', () => {
    it('rejects non-integers', () => {
      expect(() => createFleet('1')).toThrowError();
    });
  });
});
