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
