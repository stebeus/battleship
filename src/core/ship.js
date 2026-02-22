class Ship {
  constructor(length = 1) {
    this.length = length;
    this.health = this.length;
  }

  isSunk() {
    return this.health === 0;
  }

  hit() {
    this.isSunk() ? this.health : --this.health;
  }
}

export { Ship };
