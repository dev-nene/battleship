function renderBoard(gameboard, container, showShips = true) {
  container.innerHTML = "";
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
      if (hasShip && showShips) {
        divEl.classList.add("ship");
      }

      container.appendChild(divEl);
    }
  }
}

function setupAttackListener(gameboard, container, callback) {
  container.addEventListener("click", (e) => {
    const x = Number(e.target.dataset.x);
    const y = Number(e.target.dataset.y);
    if (Number.isNaN(x) || Number.isNaN(y)) return;

    callback(x, y);
  });
}

export { renderBoard, setupAttackListener };
