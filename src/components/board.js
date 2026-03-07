import { parseHTML } from '../helpers/dom.js';
import { createGrid } from './grid.js';

function createBoard({ gameBoard: { grid }, name }) {
  const gridContainer = createGrid(grid, name).outerHTML;

  return parseHTML`
    <div class="board">
      <h2 class="board__player-name">${name}</h2>
      ${gridContainer}
    </div>
  `;
}

export { createBoard };
