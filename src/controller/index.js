import createView from '../view';
import { createPlayerController } from './player';

const createController = () => {
  const player1Controller = createPlayerController();
  const player2Controller = createPlayerController();
  const view = createView(
    player1Controller.getView(),
    player2Controller.getView(),
  );
  const getView = () => view;
  return { getView };
};

export default createController;
