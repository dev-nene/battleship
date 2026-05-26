class Gameboard {
  constructor() {
    this.ships = [];
    this.missedAttacks = [];
  }

  placeShip(ship, x, y, direction = "horizontal") {
    let coordinates = [];
    if (direction === "horizontal") {
      for (let i = 0; i < ship.length; i++) {
        coordinates.push({ x, y: y + i });
      }
    } else {
      for (let i = 0; i < ship.length; i++) {
        coordinates.push({ x: x + i, y });
      }
    }
    this.ships.push({ ship, coordinates });
  }

  receiveAttack(x, y) {
    const attackedShip = this.ships.find((shipData) =>
      shipData.coordinates.some(
        (coordinate) => coordinate.x === x && coordinate.y === y,
      ),
    );
    if (attackedShip) {
      attackedShip.ship.hit();
      return;
    }

    const duplicateAttack = this.missedAttacks.find(
      (attack) => attack.x === x && attack.y === y,
    );
    if (duplicateAttack) return;

    this.missedAttacks.push({ x, y });
  }

  allShipsSunk() {
    return this.ships.every((shipData) => shipData.ship.isSunk());
  }
}

export default Gameboard;
