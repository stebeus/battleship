import { checkIsPositiveInteger } from '../utils/errors.js';

function createMatrix(rows = 1, columns = 1) {
  checkIsPositiveInteger(rows && columns, 'Row quantity' && 'Column quantity');

  const emptyCell = 0;
  const createColumns = () => new Array(columns).fill(emptyCell);

  if (rows === 1) return createColumns();

  const grid = Array.from({ length: rows }, createColumns);

  return grid;
}

export { createMatrix };
