import createGameStatsView from '../game-stats';
import './style.css';
const createPlayerView = (model, gameboardController) => {
  const view = document.createElement('div');
  view.classList.add('player-view');
  const gameStatsView = createGameStatsView(
    model,
    gameboardController.getModel(),
    model.isMachine,
  );
  const eventType = model.isMachine ? 'machineShipSunk' : 'userShipSunk';
  view.addEventListener(eventType, (event) => {
    gameStatsView.setNumberOfShipsLeft(event.detail.numOfShips);
  });
  view.append(gameboardController.getView(), gameStatsView.getView());
  return view;
};

export default createPlayerView;
