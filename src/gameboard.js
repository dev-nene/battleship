class Gameboard {
  constructor() {
    this.ships = [];
    this.missedAttacks = [];
    this.attacks = [];
  }

  placeShip(ship, x, y, direction = "horizontal") {
    let coordinates = [];
    if (x + ship.length > 10 && direction === "horizontal") return false;
    if (y + ship.length > 10 && direction === "vertical") return false;

    if (direction === "horizontal") {
      for (let i = 0; i < ship.length; i++) {
        coordinates.push({ x: x + i, y });
      }
    } else {
      for (let i = 0; i < ship.length; i++) {
        coordinates.push({ x, y: y + i });
      }
    }

    if (
      this.ships.some((shipData) =>
        shipData.coordinates.some((coordinate) =>
          coordinates.some(
            (cord) => coordinate.x === cord.x && coordinate.y === cord.y,
          ),
        ),
      )
    ) {
      return false;
    }

    this.ships.push({ ship, coordinates });
    return true;
  }

  placeRandomShip(ship) {
    let placed = false;
    while (!placed) {
      const x = Math.floor(Math.random() * 10);
      const y = Math.floor(Math.random() * 10);
      let direction = "horizontal";
      const random_boolean = Math.random() < 0.5;
      if (random_boolean) {
        direction = "vertical";
      }
      placed = this.placeShip(ship, x, y, direction);
    }
  }

  receiveAttack(x, y) {
    const duplicateAttack = this.attacks.find(
      (attack) => attack.x === x && attack.y === y,
    );

    if (duplicateAttack) return false;

    this.attacks.push({ x, y });

    const attackedShip = this.ships.find((shipData) =>
      shipData.coordinates.some(
        (coordinate) => coordinate.x === x && coordinate.y === y,
      ),
    );

    if (attackedShip) {
      attackedShip.ship.hit();
      return true;
    }

    this.missedAttacks.push({ x, y });

    return true;
  }

  allShipsSunk() {
    return this.ships.every((shipData) => shipData.ship.isSunk());
  }
}

export default Gameboard;
