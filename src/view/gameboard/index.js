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
const createCell = (
  gameboardView,
  shipInfo,
  gameboard,
  forMachine,
  indices,
) => {
  const view = document.createElement('div');
  view.classList.add('cell');
  view.setAttribute('data-row', indices[0]);
  view.setAttribute('data-col', indices[1]);
  if (forMachine) {
    view.classList.add('for-machine');
  }
  if (forMachine && shipInfo === null) {
    view.addEventListener('click', () => {
      view.classList.add('empty-marked');
    });
  }
  if (forMachine && shipInfo !== null) {
    const [x, y] = gameboard.indicesToCoordinates(indices);
    const [i, j] = indices;
    const ship = gameboard.getGrid()[i][j][0];
    view.addEventListener('click', () => {
      if (ship.hasSunk()) return;
      const attackSucceeded = gameboard.receiveAttack([x, y]);
      if (attackSucceeded) view.classList.add('attacked');
      else console.log('Attack failed');
      if (ship.hasSunk()) {
        view.classList.add('sunk');
        const occupiedCellsIndices = gameboard.getCellsOccupiedByShip(ship);
        occupiedCellsIndices.forEach((indices) => {
          const [row, col] = indices;
          const targetCell = gameboardView.querySelector(
            `div[data-row=${row}][data-col=${col}]`,
          );
          targetCell.classList.add('sunk');
        });
      }
    });
  }
  if (!forMachine && shipInfo !== null) {
    view.classList.add('ship');
    addShipSegmentStyleClass(view, shipInfo);
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
      const shipInfo = grid[i][j] === null ? null : grid[i][j][1];
      view.appendChild(
        createCell(view, shipInfo, gameboard, forMachine, [i, j]),
      );
    }
  }

  return view;
};

export default createGameboardView;
