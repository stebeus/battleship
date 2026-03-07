import './assets/style.css';
import { Player } from './core/player.js';
import { createBoard } from './ui/board.js';
import { renderGrid } from './ui/grid.js';

const main = document.querySelector('main');

const human = new Player('Human');
const robot = new Player('Robot');

const humanBoard = createBoard(human);
const robotBoard = createBoard(robot);

// Game board setups
human.gameBoard.place(5, 2, 3, 'x');
robot.gameBoard.place(5, 2, 3, 'y');

main.append(humanBoard, robotBoard);

renderGrid(human);
