import createPlayerView from '../view/player';
import createGameboardController from './gameboard';
import createPlayer from '../models/player';

const createPlayerController = () => {
  const gameboard = createGameboardController();
  const model = createPlayer('Roy');
  const view = createPlayerView(model, gameboard);
  const getModel = () => model;
  const getView = () => view;
  const getGameboardController = () => gameboard;
  return { getModel, getView, getGameboardController };
};

export { createPlayerController };
