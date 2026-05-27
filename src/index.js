import { player1, player2 } from "./gameController.js";
import { renderBoard } from "./dom.js";

const player1Div = document.querySelector(".player1");
const player2Div = document.querySelector(".player2");

renderBoard(player1.gameboard, player1Div);
renderBoard(player2.gameboard, player2Div);
