import { expect, it } from 'vitest';
import { createMatrix } from '../matrix.js';

it('rejects inputs that are not positive integers', () => {
  expect(() => createMatrix(0.5, 0)).toThrowError();
});

it('creates an one cell matrix by default', () => {
  const matrix = createMatrix();
  expect(matrix).toStrictEqual([0]);
});

it('creates a two row matrix', () => {
  const matrix = createMatrix(2);
  expect(matrix).toHaveLength(2);
});

it('creates a two column matrix', () => {
  const matrix = createMatrix(2, 2);
  expect(matrix[0]).toHaveLength(2);
});

it('represents empty cells as zero', () => {
  const matrix = createMatrix(2, 2);

  const isCellZero = (cell) => cell === 0;
  const checkRow = (row) => row.every(isCellZero);

  expect(matrix.every(checkRow)).toBeTruthy();
});
