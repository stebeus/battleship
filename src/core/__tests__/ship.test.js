import { describe, expect, it } from 'vitest';
import { Ship } from '../ship.js';

describe('Ship', () => {
  it('has length one by default', () => {
    const ship = new Ship();
    expect(ship).toHaveLength(1);
  });

  describe('Ship.isSunk', () => {});
});
