import { parseHtml } from '../utils/dom.js';
import { renderCell } from './cell.js';

function createGrid({ grid }, name) {
  const container = parseHtml`<div class="grid" data-player="${name}"></div>`;

  for (const row in grid) {
    for (const column in grid[row]) {
      const cell = parseHtml`
        <div class="grid__cell" data-coords="${row},${column}"></div>
      `;

      container.append(cell);
    }
  }

  return container;
}

function renderGrid({ gameBoard, name }) {
  const dataPlayer = `[data-player="${name}"]`;
  const grid = document.querySelector(dataPlayer);
  const cells = grid.children;

  for (const cell of cells) renderCell(cell, gameBoard);
}

export { createGrid, renderGrid };
