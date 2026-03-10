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
