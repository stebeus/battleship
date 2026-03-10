import { renderCell } from '../components/cell.js';
import { Player } from '../core/player.js';
import { parseCoordinates } from '../helpers/coordinates.js';

const players = Player.of('Human', 'Robot');

function registerAttack(cell, { gameBoard }) {
  const coordinates = cell.dataset.coords;
  const [row, column] = parseCoordinates(coordinates);

  gameBoard.receiveAttack(row, column);
  renderCell(cell, gameBoard);
}

export { players, registerAttack };
