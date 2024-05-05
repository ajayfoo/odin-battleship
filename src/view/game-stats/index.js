import './style.css';

const createGameStatsView = (player, gameboardModel, forMachine) => {
  const view = document.createElement('div');
  view.classList.add('game-stats');

  const playerNameEle = document.createElement('span');
  playerNameEle.textContent = player.getName();

  const numberOfShipsLeftEle = document.createElement('span');
  numberOfShipsLeftEle.textContent =
    ': ' + gameboardModel.getNumberOfShips() + ' ship(s) left';

  view.append(playerNameEle);
  if (!forMachine) view.append(numberOfShipsLeftEle);

  return view;
};

export default createGameStatsView;
