import createView from '../view';
import { createPlayerController } from './player';

const createController = () => {
  const player1Controller = createPlayerController('Player1');
  const player2Controller = createPlayerController('Machine', true);
  const view = createView(
    player1Controller.getView(),
    player2Controller.getView(),
  );
  const getView = () => view;
  return { getView };
};

export default createController;
