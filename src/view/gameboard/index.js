import { ShipSegmentType } from '../../models/gameboard';
import './style.css';

const addShipSegmentStyleClass = (cell, shipInfo) => {
  if (shipInfo.type !== ShipSegmentType.STAND_ALONE) {
    cell.classList.add(shipInfo.isVertical ? 'vertical' : 'horizontal');
  }
  switch (shipInfo.type) {
    case ShipSegmentType.HEAD: {
      cell.classList.add('head');
      break;
    }
    case ShipSegmentType.TAIL: {
      cell.classList.add('tail');
      break;
    }
    case ShipSegmentType.MIDDLE: {
      cell.classList.add('middle');
      break;
    }
    default: {
      cell.classList.add('stand-alone');
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
    view.addEventListener('click', () => {
      const userPlayedEvent = new CustomEvent('userPlayed');
      gameboardView.dispatchEvent(userPlayedEvent);
    });
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
        const shipSunkEvent = new CustomEvent('machineShipSunk', {
          detail: {
            numOfShips: gameboard.getNumberOfShips(),
          },
        });
        window.dispatchEvent(shipSunkEvent);
        view.classList.add('sunk');
        const occupiedCellsIndices = gameboard.getCellsOccupiedByShip(ship);
        occupiedCellsIndices.forEach((indices) => {
          const [row, col] = indices;
          const occupiedShipInfo = gameboard.getGrid()[row][col][1];
          const targetCell = gameboardView.querySelector(
            `div[data-row="${row}"][data-col="${col}"]`,
          );
          addShipSegmentStyleClass(targetCell, occupiedShipInfo);
          targetCell.classList.add('ship');
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
      const cell = createCell(view, shipInfo, gameboard, forMachine, [i, j]);
      view.appendChild(cell);
    }
  }

  return view;
};

export default createGameboardView;
