import { Ship } from '../core/ship.js';
import { parseCoordinates } from '../helpers/coordinates.js';

class CellStyle {
  constructor(cellType, classModifier) {
    this.cellType = cellType;
    this.classModifier = classModifier;
  }
}

const createCellStyle = ([cellType, classModifier]) =>
  new CellStyle(cellType, classModifier);

const createCellStyles = (...styles) => styles.map(createCellStyle);

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

  const styles = createCellStyles(
    [cell instanceof Ship, 'ship'],
    [cell === 'm', 'miss'],
    [cell === 'h', 'hit'],
  );

  for (const { cellType, classModifier } of styles) {
    if (cellType) modifyCellStyle(cellElement, coordinates, classModifier);
  }
}

export { renderCell };
