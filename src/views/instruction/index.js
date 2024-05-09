import './style.css';

const createShipTypeRaioButton = (shipType) => {
  const view = document.createElement('input');
  view.setAttribute('type', 'radio');
  view.classList.add('ship-type-radio-button');
  view.name = 'ship-type';
  view.id = 'ship-type-' + shipType;
  view.ariaLabel = 'Ship Type ' + shipType;
  return view;
};

const createShipTypeRadioButtonGroup = () => {
  const view = document.createElement('div');
  view.classList.add('ship-type-radio-button-group');
  view.append(
    createShipTypeRaioButton('carrier'),
    createShipTypeRaioButton('battleship'),
    createShipTypeRaioButton('destroyer'),
    createShipTypeRaioButton('submarine'),
    createShipTypeRaioButton('patrol-boat'),
  );
  return view;
};

const createInstruction = () => {
  const view = document.createElement('div');
  view.classList.add('instruction');
  const instructionEle = document.createElement('p');

  window.addEventListener('gameStarted', (event) => {
    instructionEle.textContent =
      'Player1 please place your ' +
      event.detail.player1.numOfShips +
      ' ship(s)';
  });
  view.append(instructionEle, createShipTypeRadioButtonGroup());
  return view;
};

export { createInstruction };
