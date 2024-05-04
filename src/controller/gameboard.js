import createGameboardView from '../view/gameboard';
import { createGameboard } from '../models/gameboard';

const predeterminedGameboard = () => {
  const gameboard = createGameboard();
  gameboard.placeShipAt([1, 'A'], true, 2);
  gameboard.placeShipAt([3, 'C'], false, 3);
  return gameboard;
};
const createGameboardController = () => {
  const model = predeterminedGameboard();
  const view = createGameboardView(model);
  return { view };
};

export default createGameboardController;
