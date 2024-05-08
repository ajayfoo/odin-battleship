import createView from '../views';
import { createPlayerController } from './player';
import {
  applyCellStyleBasedOnAttackResult,
  applySunkShipStyle,
} from '../views/gameboard';
import { AttackResult } from '../utils';

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

const getRandomIndexRowCols = () => {
  const indexRowCols = [];
  for (let i = 0; i < 10; ++i) {
    for (let j = 0; j < 10; ++j) {
      indexRowCols.push([i, j]);
    }
  }
  shuffleArray(indexRowCols);
  return indexRowCols;
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

  const randomIndexRowCols = getRandomIndexRowCols();
  // const randomIndexRowCols = [
  //   [0, 0],
  //   [0, 1],
  //   [0, 2],
  // ];
  const player2Controller = createPlayerController('Machine', true);
  player2Controller
    .getGameboardController()
    .getView()
    .addEventListener('userPlayed', () => {
      if (randomIndexRowCols.length === 0) {
        alert('Game Over');
        return;
      }
      const [row, col] = randomIndexRowCols.pop();
      const attackResult = gameboard1Model.receiveAttack(
        gameboard1Model.indexRowColToCoordinates([row, col]),
      );
      const targetCell = gameboard1View.querySelector(
        `div[data-row="${row}"][data-col="${col}"]`,
      );
      applyCellStyleBasedOnAttackResult(targetCell, attackResult);
      if (attackResult !== AttackResult.SUCCESSFUL) return;
      const ship = gameboard1Model.getGrid()[row][col][0];
      if (ship.hasSunk()) {
        dispatchShipSunkEvent(gameboard1Model, player1Controller.getView());
        applySunkShipStyle(gameboard1Model, gameboard1View, ship);
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
