import './assets/style.css';
import { createBoard } from './components/board.js';
import { players } from './controllers/game-controller.js';

const main = document.querySelector('main');

const humanBoard = createBoard(players[0]);
const robotBoard = createBoard(players[1]);

// Board setups
players[0].gameBoard.place(7, 3, 3, 'x');

main.append(humanBoard, robotBoard);
