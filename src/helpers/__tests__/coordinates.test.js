import { expect, it } from 'vitest';
import { parseCoordinates } from '../coordinates.js';

it('parses strings to numeric coordinates', () => {
  expect(parseCoordinates('0,0')).toStrictEqual([0, 0]);
});
