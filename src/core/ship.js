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
}

export { Ship };
