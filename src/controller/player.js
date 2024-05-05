import createPlayerView from '../view/player';
import createGameboardController from './gameboard';
import createPlayer from '../models/player';

const createPlayerController = (name, isMachine) => {
  const gameboard = createGameboardController(isMachine);
  const model = createPlayer(name, isMachine);
  const view = createPlayerView(model, gameboard);
  const getModel = () => model;
  const getView = () => view;
  const getGameboardController = () => gameboard;
  return { getModel, getView, getGameboardController };
};

export { createPlayerController };
