import createGameStatsView from '../game-stats';
import './style.css';
const createPlayerView = (model, gameboardController) => {
  const view = document.createElement('div');
  view.classList.add('player-view');

  const gameStatsView = createGameStatsView(
    model,
    gameboardController.getModel(),
    () => {},
  );

  view.append(gameboardController.getView(), gameStatsView);
  return view;
};

export default createPlayerView;
