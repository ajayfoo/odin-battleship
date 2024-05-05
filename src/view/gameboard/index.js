import { ShipSegmentType } from '../../models/gameboard';
import './style.css';

const addShipSegmentStyleClass = (view, shipInfo) => {
  if (shipInfo.type !== ShipSegmentType.STAND_ALONE) {
    view.classList.add(shipInfo.isVertical ? 'vertical' : 'horizontal');
  }
  switch (shipInfo.type) {
    case ShipSegmentType.HEAD: {
      view.classList.add('head');
      break;
    }
    case ShipSegmentType.TAIL: {
      view.classList.add('tail');
      break;
    }
    case ShipSegmentType.MIDDLE: {
      view.classList.add('middle');
      break;
    }
    default: {
      view.classList.add('stand-alone');
      break;
    }
  }
};
const createCell = (shipInfo, gameboard, forMachine, coordinates) => {
  const view = document.createElement('div');
  view.classList.add('cell');
  if (shipInfo !== null) {
    view.classList.add('ship');
    addShipSegmentStyleClass(view, shipInfo);
  }
  if (forMachine) {
    view.classList.add('for-machine');
    view.addEventListener('click', () => {
      const [x, y] = coordinates;
      console.log(x, y);
    });
  }
  return view;
};
const createGameboardView = (gameboard, forMachine) => {
  const view = document.createElement('div');
  view.classList.add('gameboard');

  const [row, col] = gameboard.getSize();

  const grid = gameboard.getGrid();

  for (let i = 0; i < row; ++i) {
    for (let j = 0; j < col; ++j) {
      if (forMachine) {
        view.appendChild(createCell(null, gameboard, forMachine, [i, j]));
        continue;
      }
      if (grid[i][j] === null)
        view.appendChild(createCell(null, gameboard, forMachine, [i, j]));
      else {
        const shipInfo = grid[i][j][1];
        view.appendChild(createCell(shipInfo, gameboard, forMachine, [i, j]));
      }
    }
  }

  return view;
};

export default createGameboardView;
