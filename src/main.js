import './assets/style.css';
import { createBoard } from './components/board.js';
import { renderGrid } from './components/grid.js';
import { players } from './controllers/game-controller.js';
import { handleAttack } from './controllers/handlers.js';

const main = document.querySelector('main');

const humanBoard = createBoard(players[0]);
const robotBoard = createBoard(players[1]);

main.append(humanBoard, robotBoard);

// Board setups
players[0].gameBoard.place(7, 3, 3, 'x');
players[1].gameBoard.place(7, 3, 3, 'y');

// Human grid render
renderGrid(players[0]);

// Event listeners
robotBoard.addEventListener('click', handleAttack);
