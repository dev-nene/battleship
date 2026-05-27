import Gameboard from "../src/gameboard";
import Player from "../src/player";

test("player has gameboard", () => {
  const player = new Player();

  expect(player.gameboard).toBeInstanceOf(Gameboard);
});

test("player type is stored (real)", () => {
  const player = new Player();

  expect(player.type).toBe("real");
});

test("computer makes legal moves", () => {
  const player = new Player("pc");
  const enemyBoard = new Gameboard();
  player.randomAttack(enemyBoard);
  expect(enemyBoard.missedAttacks.length).toBe(1);
});
