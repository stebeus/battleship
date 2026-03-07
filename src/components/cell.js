import { Ship } from '../core/ship.js';
import { parseCoordinates } from '../helpers/coordinates-helper.js';

class CellStyle {
  constructor(cellType, classModifier) {
    this.cellType = cellType;
    this.classModifier = classModifier;
  }
}

function modifyCellStyle(cell, coordinates, classModifier) {
  const dataCoordinates = cell.dataset.coordinates;

  if (dataCoordinates === coordinates) {
    cell.classList.add(`grid__cell--${classModifier}`);
  }
}

function renderCell(cellElement, grid) {
  const coordinates = cellElement.dataset.coordinates;
  const [row, column] = parseCoordinates(coordinates);
  const cell = grid[row][column];

  const styles = [
    new CellStyle(cell instanceof Ship, 'ship'),
    new CellStyle(cell === 'm', 'miss'),
    new CellStyle(cell === 'h', 'hit'),
  ];

  for (const { cellType, classModifier } of styles) {
    if (cellType) modifyCellStyle(cellElement, coordinates, classModifier);
  }
}

export { renderCell };
