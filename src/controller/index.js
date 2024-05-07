import createView from '../view';
import { createPlayerController } from './player';

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

  const randomIndices = getRandomIndices();
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
      gameboard1Model.receiveAttack(
        gameboard1Model.indicesToCoordinates([row, col]),
      );
      const targetCell = gameboard1View.querySelector(
        `div[data-row="${row}"][data-col="${col}"]`,
      );
      targetCell.style.backgroundColor = 'yellow';
    });

  const view = createView(
    player1Controller.getView(),
    player2Controller.getView(),
  );
  const getView = () => view;
  return { getView };
};

export default createController;
