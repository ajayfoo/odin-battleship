import createView from '../view';
import { createPlayerController } from './player';
import { addShipSegmentStyleClass } from '../view/gameboard';

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

const getRandomIndices = () => {
  const indices = [];
  for (let i = 0; i < 10; ++i) {
    for (let j = 0; j < 10; ++j) {
      indices.push([i, j]);
    }
  }
  shuffleArray(indices);
  return indices;
};

const createController = () => {
  const player1Controller = createPlayerController('Player1');

  const gameboard1Model = player1Controller.getGameboardController().getModel();
  const gameboard1View = player1Controller.getGameboardController().getView();

  // const randomIndices = getRandomIndices();
  const randomIndices = [
    [0, 0],
    [0, 1],
  ];
  const player2Controller = createPlayerController('Machine', true);
  player2Controller
    .getGameboardController()
    .getView()
    .addEventListener('userPlayed', () => {
      if (randomIndices.length === 0) {
        alert('Game Over');
        return;
      }
      const [row, col] = randomIndices.pop();
      const attackSucceeded = gameboard1Model.receiveAttack(
        gameboard1Model.indicesToCoordinates([row, col]),
      );
      const targetCell = gameboard1View.querySelector(
        `div[data-row="${row}"][data-col="${col}"]`,
      );
      if (attackSucceeded) {
        targetCell.classList.add('attacked');
        const ship = gameboard1Model.getGrid()[row][col][0];
        if (ship.hasSunk()) {
          const shipSunkEvent = new CustomEvent('userShipSunk', {
            detail: {
              numOfShips: gameboard1Model.getNumberOfShips(),
            },
          });
          player1Controller.getView().dispatchEvent(shipSunkEvent);
          view.classList.add('sunk');
          const occupiedCellsIndices =
            gameboard1Model.getCellsOccupiedByShip(ship);
          occupiedCellsIndices.forEach((indices) => {
            console.log(indices);
            const [row, col] = indices;
            const occupiedShipInfo = gameboard1Model.getGrid()[row][col][1];
            const targetCell = gameboard1View.querySelector(
              `div[data-row="${row}"][data-col="${col}"]`,
            );
            addShipSegmentStyleClass(targetCell, occupiedShipInfo);
            targetCell.classList.add('ship');
            targetCell.classList.add('sunk');
          });
        }
      } else {
        targetCell.classList.add('empty-marked');
      }
    });

  const view = createView(
    player1Controller.getView(),
    player2Controller.getView(),
  );
  const getView = () => view;
  return { getView };
};

export default createController;
