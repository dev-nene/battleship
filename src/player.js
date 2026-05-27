import Gameboard from "./gameboard";

class Player {
  constructor(type = "real") {
    this.type = type;
    this.gameboard = new Gameboard();
  }

  randomAttack(enemyBoard) {
    const x = Math.floor(Math.random() * 10);
    const y = Math.floor(Math.random() * 10);
    enemyBoard.receiveAttack(x, y);
  }
}

export default Player;
