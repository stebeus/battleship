import { checkIsPositiveInteger } from '../utils/errors.js';

class Ship {
  #length;

  constructor(length = 1) {
    this.length = length;
    this.health = this.length;
  }

  get length() {
    return this.#length;
  }

  set length(value) {
    checkIsPositiveInteger(value, 'Ship length');
    this.#length = value;
  }

  isSunk() {
    return this.health === 0;
  }

  hit() {
    return this.isSunk() ? this.health : --this.health;
  }
}

function createFleet(quantity = 1) {
  checkIsPositiveInteger(quantity, 'Fleet size');

  const fleet = [];
  let currentShipLength = 1;

  const createDivision = (size, shipLength) =>
    Array.from({ length: size }, () => new Ship(shipLength));

  for (let remainingUnits = quantity; remainingUnits > 0; remainingUnits--) {
    const division = createDivision(remainingUnits, currentShipLength++);
    fleet.push(...division);
  }

  return fleet;
}

export { Ship, createFleet };
