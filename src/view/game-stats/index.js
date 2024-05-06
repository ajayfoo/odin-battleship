import './style.css';

const createGameStatsView = (player, gameboardModel, forMachine) => {
  const view = document.createElement('div');
  view.classList.add('game-stats');

  const playerNameEle = document.createElement('span');
  playerNameEle.textContent = player.getName();

  const numberOfShipsLeftEle = document.createElement('span');
  numberOfShipsLeftEle.textContent =
    ': ' + gameboardModel.getNumberOfShips() + ' ship(s) left';

  const eventType = forMachine ? 'machineShipSunk' : 'shipSunk';
  window.addEventListener(eventType, (event) => {
    console.log(event);
    numberOfShipsLeftEle.textContent =
      ': ' + event.detail.numOfShips + ' ship(s) left';
  });

  view.append(playerNameEle);
  view.append(numberOfShipsLeftEle);

  return view;
};

export default createGameStatsView;
