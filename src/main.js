import './assets/style.css';
import { createBoard } from './components/board.js';
import { players } from './controllers/game-controller.js';

const main = document.querySelector('main');

const humanBoard = createBoard(players[0]);

main.append(humanBoard);
