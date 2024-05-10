import './style.css';

import { ShipSize, htmlIdToJsIndentifier } from '../../utils';

const createShipTypeRadioButton = (shipType) => {
  const view = document.createElement('input');
  view.setAttribute('type', 'radio');
  view.classList.add('ship-type-radio-button');
  view.name = 'ship-type';
  view.id = 'ship-type-' + shipType;
  view.ariaLabel = 'Ship Type ' + shipType;
  view.value = ShipSize[htmlIdToJsIndentifier(shipType)];
  return view;
};

const createShipTypeRadioButtonGroup = () => {
  const view = document.createElement('div');
  view.classList.add('ship-type-radio-button-group');
  const radioButtons = [
    createShipTypeRadioButton('carrier'),
    createShipTypeRadioButton('battleship'),
    createShipTypeRadioButton('destroyer'),
    createShipTypeRadioButton('patrol-boat'),
  ];
  radioButtons[0].checked = true;
  radioButtons.forEach((radioButton) => {
    radioButton.addEventListener('change', () => {
      if (radioButton.checked) {
        const newShipTypeChangedEvent = new CustomEvent('newShipTypeChanged', {
          detail: {
            shipSize: parseInt(radioButton.value),
          },
        });
        window.dispatchEvent(newShipTypeChangedEvent);
      }
    });
    view.appendChild(radioButton);
  });
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
      'newShipDirectionTypeChanged',
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
  const view = document.createElement('form');
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
