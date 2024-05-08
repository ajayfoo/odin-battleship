import createView from '../views';
import { createPlayerController } from './player';
import {
  addShipSegmentStyleClass,
  setCellStyleClassBasedOnAttackResult,
} from '../views/gameboard';
import { AttackResult } from '../utils';

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

const dispatchShipSunkEvent = (gameboard, view) => {
  const shipSunkEvent = new CustomEvent('userShipSunk', {
    detail: {
      numOfShips: gameboard.getNumberOfShips(),
    },
  });
  view.dispatchEvent(shipSunkEvent);
};

const createController = () => {
  const player1Controller = createPlayerController('Player1');

  const gameboard1Model = player1Controller.getGameboardController().getModel();
  const gameboard1View = player1Controller.getGameboardController().getView();

  const randomIndices = getRandomIndices();
  // const randomIndices = [
  //   [0, 0],
  //   [0, 1],
  // ];
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
      const attackResult = gameboard1Model.receiveAttack(
        gameboard1Model.indicesToCoordinates([row, col]),
      );
      const targetCell = gameboard1View.querySelector(
        `div[data-row="${row}"][data-col="${col}"]`,
      );
      setCellStyleClassBasedOnAttackResult(targetCell, attackResult);
      if (attackResult !== AttackResult.SUCCESSFUL) return;
      const ship = gameboard1Model.getGrid()[row][col][0];
      if (ship.hasSunk()) {
        dispatchShipSunkEvent(gameboard1Model, player1Controller.getView());
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
    });

  const view = createView(
    player1Controller.getView(),
    player2Controller.getView(),
  );
  const getView = () => view;
  return { getView };
};

export default createController;
