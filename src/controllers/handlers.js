import { players, registerAttack } from './game-controller.js';

const handleAttack = ({ target }) => registerAttack(target, players[1]);

export { handleAttack };
