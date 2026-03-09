import { expect, it } from 'vitest';
import { createMatrix } from '../matrix.js';

it('rejects inputs that are not positive integers', () => {
  expect(() => createMatrix(0.5, 0)).toThrowError();
});
