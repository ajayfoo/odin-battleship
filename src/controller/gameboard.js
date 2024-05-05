import createGameboardView from '../view/gameboard';
import { createGameboard } from '../models/gameboard';

const predeterminedGameboard = () => {
  const gameboard = createGameboard();
  gameboard.placeShipAt([1, 'A'], false, 2);
  gameboard.placeShipAt([1, 'D'], true, 3);
  gameboard.placeShipAt([1, 'G'], false, 4);
  gameboard.placeShipAt([3, 'A'], true, 4);
  gameboard.placeShipAt([3, 'F'], false, 3);
  gameboard.placeShipAt([3, 'J'], true, 2);
  gameboard.placeShipAt([6, 'F'], true, 2);
  gameboard.placeShipAt([6, 'J'], true, 3);
  gameboard.placeShipAt([8, 'A'], false, 2);
  gameboard.placeShipAt([10, 'F'], false, 5);
  return gameboard;
};
const createGameboardController = () => {
  const model = predeterminedGameboard();
  const view = createGameboardView(model);
  const getModel = () => model;
  const getView = () => view;
  return { getModel, getView };
};

export default createGameboardController;
