import { Ship } from "../core/ship";

function createDivision(quantity = 1, shipLength = 1) {
  const division = [];

  for (let unit = 0; unit < quantity; unit++) {
    const ship = new Ship(shipLength);
    division.push(ship);
  }

  return division;
}

function createFleet(quantity) {
  const fleet = [];

  let shipLength = 1;

  for (let division = 0; division < quantity; division++) {
    const division = createDivision(quantity--, shipLength++);
    fleet.push(division);
  }

  return fleet.flat();
}

export { createDivision, createFleet };
