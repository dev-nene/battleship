import Player from "./player.js";
import { renderBoard, setupAttackListener } from "./dom.js";
import Ship from "./ship.js";

const randomBtn = document.querySelector(".randomBtn");
const startBtn = document.querySelector(".startBtn");

let currentPlayer = "player";
let gameOver = false;
let playerCanShoot = true;

function switchTurn(player1, player2, player1Div, player2Div) {
  currentPlayer = currentPlayer === "player" ? "computer" : "player";
  if (currentPlayer === "computer") {
    playerCanShoot = false;
    setTimeout(() => {
      computerTurn(player1, player2, player1Div, player2Div);
    }, 800);
  } else {
    playerCanShoot = true;
  }
}

function computerTurn(player1, player2, player1Div, player2Div) {
  if (gameOver) return;
  let validMove = false;

  while (!validMove) {
    validMove = player2.randomAttack(player1.gameboard);
  }

  renderBoard(player1.gameboard, player1Div);

  if (player1.gameboard.allShipsSunk()) {
    endGame("computer");
    return;
  }
  switchTurn(player1, player2, player1Div, player2Div);
}

function playerTurn(x, y, player1, player2, player1Div, player2Div) {
  if (gameOver || !playerCanShoot) return;

  const validMove = player2.gameboard.receiveAttack(x, y);
  if (!validMove) return;

  renderBoard(player2.gameboard, player2Div, false);

  if (player2.gameboard.allShipsSunk()) {
    endGame("player");
    return;
  }

  switchTurn(player1, player2, player1Div, player2Div);
}

function endGame(winner) {
  gameOver = true;
  const msg = winner === "player" ? "You win" : "Computer wins";
  alert(msg);
}

const player1 = new Player();
const player2 = new Player("computer");

const player1Div = document.querySelector(".player1");
const player2Div = document.querySelector(".player2");

function playGame() {
  currentPlayer = "player";
  gameOver = false;
  playerCanShoot = true;

  startBtn.style.display = "none";
  randomBtn.style.display = "none";

  renderBoard(player1.gameboard, player1Div);
  renderBoard(player2.gameboard, player2Div, false);
  setupAttackListener(player2.gameboard, player2Div, (x, y) => {
    playerTurn(x, y, player1, player2, player1Div, player2Div);
  });
}

startBtn.addEventListener("click", () => {
  if (player1.gameboard.ships.length === 0) {
    alert("Place your ships first!");
    return;
  }

  playGame();
});

randomBtn.addEventListener("click", () => {
  const fleet = [5, 4, 3, 3, 2];
  player1.gameboard.ships = [];
  player2.gameboard.ships = [];

  fleet.forEach((ship) => {
    player1.gameboard.placeRandomShip(new Ship(ship));
    player2.gameboard.placeRandomShip(new Ship(ship));
  });

  renderBoard(player1.gameboard, player1Div);
});

export { playGame };
