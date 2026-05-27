import Player from "./player.js";
import { renderBoard } from "./dom.js";
import Ship from "./ship.js";

const player1 = new Player();
const player2 = new Player("computer");

const fleet = [5, 4, 3, 3, 2];

fleet.forEach((ship) => {
  let placed = false;
  player1.gameboard.placeRandomShip(new Ship(ship));
  player2.gameboard.placeRandomShip(new Ship(ship));
});
export { player1, player2 };
