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

const dispatchShipSunkEvent = (gameboard) => {
  const shipSunkEvent = new CustomEvent('machineShipSunk', {
    detail: {
      numOfShips: gameboard.getNumberOfShips(),
    },
  });
  window.dispatchEvent(shipSunkEvent);
};

const setClickEventListenerForShipCell = (
  cell,
  gameboard,
  gameboardView,
  indexRowCol,
) => {
  const [x, y] = gameboard.indicesToCoordinates(indexRowCol);
  const [i, j] = indexRowCol;
  const ship = gameboard.getGrid()[i][j][0];
  cell.addEventListener('click', () => {
    if (ship.hasSunk()) return;
    const attackSucceeded = gameboard.receiveAttack([x, y]);
    if (attackSucceeded) cell.classList.add('attacked');
    else console.log('Attack failed');
    if (ship.hasSunk()) {
      dispatchShipSunkEvent(gameboard);
      cell.classList.add('sunk');
      const occupiedCellsIndexRowCols = gameboard.getCellsOccupiedByShip(ship);
      occupiedCellsIndexRowCols.forEach((rowCol) => {
        const [row, col] = rowCol;
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
};

const createCell = (gameboardView, shipInfo, gameboard, forMachine, rowCol) => {
  const view = document.createElement('div');
  view.classList.add('cell');
  view.setAttribute('data-row', rowCol[0]);
  view.setAttribute('data-col', rowCol[1]);
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
    setClickEventListenerForShipCell(view, gameboard, gameboardView, rowCol);
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

export { createGameboardView, addShipSegmentStyleClass };
