import { parseHTML } from '../helpers/dom.js';

function createGrid(grid, name) {
  const container = parseHTML`<div class="grid" data-player="${name}"></div>`;

  for (const row in grid) {
    for (const column in grid[row]) {
      const cell = parseHTML`            
        <div class="grid__cell" data-coordinates="${row},${column}"></div>
      `;

      container.append(cell);
    }
  }

  return container;
}

export { createGrid };
