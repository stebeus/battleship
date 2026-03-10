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
