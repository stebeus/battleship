import { renderCell } from '../components/cell.js';
import { Player } from '../core/player.js';
import { parseCoordinates } from '../helpers/coordinates.js';

const players = Player.of('Human', 'Robot');

let activePlayer = players[0];

function switchTurn(gameBoard, row, column, players, activePlayer) {
  const isCellEmpty = gameBoard.isCellOfType(row, column, 0);

  if (isCellEmpty) {
    const currentIndex = players.indexOf(activePlayer);
    const nextIndex = (currentIndex + 1) % players.length;

    activePlayer = players[nextIndex];
  }

  return activePlayer;
}

function registerAttack(cell, { gameBoard }) {
  const coordinates = cell.dataset.coords;
  const [row, column] = parseCoordinates(coordinates);

  activePlayer = switchTurn(gameBoard, row, column, players, activePlayer);

  gameBoard.receiveAttack(row, column);
  renderCell(cell, gameBoard);
}

export { players, activePlayer, registerAttack };
