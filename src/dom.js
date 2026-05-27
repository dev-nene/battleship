function renderBoard(gameboard, container, showShips = true) {
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      const divEl = document.createElement("div");
      divEl.dataset.x = i;
      divEl.dataset.y = j;

      const hasShip = gameboard.ships.some((shipData) =>
        shipData.coordinates.some(
          (coordinate) => coordinate.x === i && coordinate.y === j,
        ),
      );
      const attacked = gameboard.attacks.some(
        (attack) => attack.x === i && attack.y === j,
      );

      if (attacked && hasShip) {
        divEl.classList.add("hit");
      }
      if (attacked && !hasShip) {
        divEl.classList.add("miss");
      }
      if (hasShip) {
        divEl.classList.add("ship");
      }

      container.appendChild(divEl);
    }
  }
}

export { renderBoard };
