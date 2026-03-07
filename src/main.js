import './assets/style.css';
import { createBoard } from './components/board.js';
import { Player } from './core/player.js';

const main = document.querySelector('main');

const human = new Player('Human');
const robot = new Player('Robot');

const humanBoard = createBoard(human);
const robotBoard = createBoard(robot);

main.append(humanBoard, robotBoard);
