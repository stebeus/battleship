import { describe, expect, it } from 'vitest';
import { Ship } from '../ship.js';

describe('Ship', () => {
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
  });
});
