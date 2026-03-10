import { parseCoordinates } from '../helpers/coordinates.js';

class CellStyle {
  static of(...styles) {
    const createCellStyle = ([cellType, classModifier]) =>
      new CellStyle(cellType, classModifier);

    return styles.map(createCellStyle);
  }

  constructor(cellType, classModifier) {
    this.cellType = cellType;
    this.classModifier = `grid__cell--${classModifier}`;
  }
}

function modifyCellStyle(cell, coordinates, classModifier) {
  const dataCoords = cell.dataset.coords;

  if (dataCoords === coordinates) {
    cell.classList.add(classModifier);
  }
}

function renderCell(cell, gameBoard) {
  const coordinates = cell.dataset.coords;
  const [row, column] = parseCoordinates(coordinates);

  const styles = CellStyle.of(
    [gameBoard.isCellShip(row, column), 'ship'],
    [gameBoard.isCellOfType(row, column, 'miss'), 'miss'],
    [gameBoard.isCellOfType(row, column, 'hit'), 'hit'],
  );

  for (const { cellType, classModifier } of styles) {
    if (cellType) modifyCellStyle(cell, coordinates, classModifier);
  }
}

export { renderCell };
