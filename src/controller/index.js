import createView from '../view';
import { createPlayerController } from './player';

const createController = () => {
  const player1Controller = createPlayerController('Player1');
  const player2Controller = createPlayerController('Machine', true);
  console.log('controller');
  player2Controller
    .getGameboardController()
    .getView()
    .addEventListener('userPlayed', () => {
      console.log('user has played');
      const gameboard1Model = player1Controller
        .getGameboardController()
        .getModel();
      const gameboard1View = player1Controller
        .getGameboardController()
        .getView();
      gameboard1Model.receiveAttack([1, 'A']);
      gameboard1View.style.backgroundColor = 'white';
    });

  const view = createView(
    player1Controller.getView(),
    player2Controller.getView(),
  );
  const getView = () => view;
  return { getView };
};

export default createController;
