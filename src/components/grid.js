import { parseHtml } from '../helpers/dom.js';
import { renderCell } from './cell.js';

function createGrid(grid, name) {
  const container = parseHtml`<div class="grid" data-player="${name}"></div>`;

  for (const row in grid) {
    for (const column in grid[row]) {
      const cell = parseHtml`            
        <div class="grid__cell" data-coordinates="${row},${column}"></div>
      `;

      container.append(cell);
    }
  }

  return container;
}

function renderGrid({ gameBoard: { grid }, name }) {
  const dataPlayer = `[data-player="${name}"]`;
  const gridContainer = document.querySelector(dataPlayer);
  const cells = gridContainer.children;

  for (const cell of cells) renderCell(cell, grid);
}

export { createGrid, renderGrid };
