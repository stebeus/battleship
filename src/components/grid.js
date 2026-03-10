import { parseHtml } from '../utils/dom.js';

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

export { createGrid };
