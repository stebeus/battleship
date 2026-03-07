import { parseHTML } from '../helpers/dom.js';
import { createGrid } from './grid.js';

function createBoard({ gameBoard: { grid }, name }) {
  const gridContainer = createGrid(grid).outerHTML;

  return parseHTML`
    <div class="board" data-player="${name}">
      <h2 class="board__player-name">${name}</h2>
      ${gridContainer}
    </div>
  `;
}

export { createBoard };
