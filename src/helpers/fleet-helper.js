import { Ship } from "../core/ship";

function createDivision(quantity = 1, shipLength = 1) {
  const division = [];

  for (let unit = 0; unit < quantity; unit++) {
    const ship = new Ship(shipLength);
    division.push(ship);
  }

  return division;
}

export { createDivision };
