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
    if (!Number.isInteger(value) || value < 1) {
      throw new Error(`Ship length (${value}) is not a positive integer`);
    }

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
  if (!Number.isInteger(quantity) || quantity < 1) {
    throw new Error(`Fleet size (${quantity}) is not a positive integer`);
  }

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
