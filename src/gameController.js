import Player from "./player.js";
import { renderBoard, setupAttackListener } from "./dom.js";
import Ship from "./ship.js";

const player1 = new Player();
const player2 = new Player("computer");

const fleet = [5, 4, 3, 3, 2];

function playGame() {
  fleet.forEach((ship) => {
    player1.gameboard.placeRandomShip(new Ship(ship));
    player2.gameboard.placeRandomShip(new Ship(ship));
  });

  const player1Div = document.querySelector(".player1");
  const player2Div = document.querySelector(".player2");

  renderBoard(player1.gameboard, player1Div);
  renderBoard(player2.gameboard, player2Div);

  setupAttackListener(player2.gameboard, player2Div);
}

export { playGame };
