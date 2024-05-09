import './style.css';

const createShipTypeRadioButton = (shipType) => {
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
  const carrier = createShipTypeRadioButton('carrier');
  carrier.checked = true;
  view.append(
    carrier,
    createShipTypeRadioButton('battleship'),
    createShipTypeRadioButton('destroyer'),
    createShipTypeRadioButton('patrol-boat'),
  );
  return view;
};

const createShipDirectionTypeCheckbox = () => {
  const view = document.createElement('input');
  view.setAttribute('type', 'checkbox');
  view.id = 'ship-direction-type';
  view.ariaLabel = 'ship direction type: vertical';
  view.checked = true;
  view.addEventListener('click', () => {
    const newShipDirectionTypeChangedEvent = new CustomEvent(
      'newShipDirectionTypeChangedEvent',
      {
        detail: {
          isVertical: view.checked,
        },
      },
    );
    window.dispatchEvent(newShipDirectionTypeChangedEvent);
  });
  return view;
};

const createShipConfiguration = () => {
  const view = document.createElement('div');
  view.classList.add('ship-configuration');

  const seperator = document.createElement('span');
  seperator.textContent = '—';
  seperator.classList.add('seperator');

  view.append(
    createShipDirectionTypeCheckbox(),
    seperator,
    createShipTypeRadioButtonGroup(),
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
  view.append(instructionEle, createShipConfiguration());
  return view;
};

export { createInstruction };
