import { ShipSegmentType } from '../../models/gameboard';
import { AttackResult } from '../../utils';
import './style.css';

const applyShipSegmentStyle = (cell, shipInfo) => {
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

const dispatchShipSunkEvent = (gameboard, view, forMachine = false) => {
  const shipSunkEvent = new CustomEvent(
    forMachine ? 'machineShipSunk' : 'userShipSunk',
    {
      detail: {
        numOfShips: gameboard.getNumberOfShips(),
      },
    },
  );
  view.dispatchEvent(shipSunkEvent);
};

const applyCellStyleBasedOnAttackResult = (cell, attackResult) => {
  switch (attackResult) {
    case AttackResult.FAILED: {
      cell.classList.add('empty-marked');
      break;
    }
    case AttackResult.SUCCESSFUL: {
      cell.classList.add('attacked');
      break;
    }
    case AttackResult.REDUNDANT: {
      alert("Can't Attack the location twice");
      break;
    }
    default: {
      throw new Error('Something went wrong! Bad AttackResult');
    }
  }
};

const applySunkShipStyle = (gameboard, gameboardView, ship) => {
  const occupiedCellsRowCols = gameboard.getCellsOccupiedByShip(ship);
  occupiedCellsRowCols.forEach((rowCol) => {
    const [row, col] = rowCol;
    const occupiedShipInfo = gameboard.getGrid()[row][col][1];
    const targetCell = gameboardView.querySelector(
      `div[data-row="${row}"][data-col="${col}"]`,
    );
    applyShipSegmentStyle(targetCell, occupiedShipInfo);
    targetCell.classList.add('ship');
    targetCell.classList.add('sunk');
  });
};

const setClickEventListenerForShipCell = (
  cell,
  gameboard,
  gameboardView,
  indexRowCol,
) => {
  cell.addEventListener('click', () => {
    const [x, y] = gameboard.indexRowColToCoordinates(indexRowCol);
    const attackResult = gameboard.receiveAttack([x, y]);
    applyCellStyleBasedOnAttackResult(cell, attackResult);
    if (attackResult === AttackResult.REDUNDANT) return;
    const userPlayedEvent = new CustomEvent('userPlayed');
    gameboardView.dispatchEvent(userPlayedEvent);
    if (attackResult === AttackResult.FAILED) return;
    const [i, j] = indexRowCol;
    const ship = gameboard.getGrid()[i][j][0];
    if (ship.hasSunk()) {
      dispatchShipSunkEvent(gameboard, window, true);
      applySunkShipStyle(gameboard, gameboardView, ship);
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
    setClickEventListenerForShipCell(view, gameboard, gameboardView, rowCol);
  }
  if (!forMachine && shipInfo !== null) {
    view.classList.add('ship');
    applyShipSegmentStyle(view, shipInfo);
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

export {
  createGameboardView,
  applyShipSegmentStyle,
  applyCellStyleBasedOnAttackResult,
  applySunkShipStyle,
  dispatchShipSunkEvent,
};
