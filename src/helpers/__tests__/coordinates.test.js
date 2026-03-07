import { expect, it } from 'vitest';
import { parseCoordinates } from '../coordinates';

it('parses a string to a list of coordinates', () => {
  expect(parseCoordinates('0,0')).toStrictEqual([0, 0]);
});
