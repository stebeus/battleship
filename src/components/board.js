import { parseHtml } from '../utils/dom.js';
import { createGrid } from './grid.js';

function createBoard({ gameBoard, name }) {
  const grid = createGrid(gameBoard, name);

  return parseHtml`
    <section class="board">
      <h2 class="board__player-name">${name}</h2>
      ${grid}
    </section>
  `;
}

export { createBoard };
