import ExportedCompatObject from "core-js-compat";
import Gameboard from "../src/gameboard";
import Ship from "../src/ship";

let gameboard;

beforeEach(() => {
  gameboard = new Gameboard();
});

test("placeShip stores ship", () => {
  let ship = new Ship(2);

  gameboard.placeShip(ship, 1, 1);

  expect(gameboard.ships.some((shipData) => shipData.ship === ship)).toBe(true);
});

test("receiveAttack attacks right ship on placed coordinate", () => {
  let ship = new Ship(2);

  gameboard.placeShip(ship, 1, 1);

  gameboard.receiveAttack(1, 1);

  expect(ship.hits).toBe(1);
});

test("receiveAttack attack right ship on different coordinate than placed", () => {
  let ship = new Ship(2);

  gameboard.placeShip(ship, 1, 1);
  gameboard.receiveAttack(1, 2);

  expect(ship.hits).toBe(1);
});
