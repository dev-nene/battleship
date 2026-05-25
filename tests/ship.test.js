import Ship from "../src/ship.js";

let ship;

beforeEach(() => {
  ship = new Ship(3);
});

test("ship length is correct", () => {
  expect(ship.length).toBe(3);
});

test("ship hits increase", () => {
  ship.hit();

  expect(ship.hits).toBe(1);
});

test("ship sinks", () => {
  ship.hit();
  ship.hit();
  ship.hit();

  expect(ship.isSunk()).toBe(true);
});
