import createView from '../view';
import createGameboardController from './gameboard';

const createController = () => {
  const gameboard1 = createGameboardController();
  const gameboard2 = createGameboardController();
  const view = createView(gameboard1, gameboard2);
  return { view };
};

export default createController;
