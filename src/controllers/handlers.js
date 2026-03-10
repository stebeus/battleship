import { activePlayer, players, registerAttack } from './game-controller.js';

function handleAttack({ target }) {
  if (activePlayer !== players[0]) return;
  registerAttack(target, players[1]);
}

export { handleAttack };
