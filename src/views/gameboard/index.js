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

const applyShipStyle = (indexRowCol, gameboard, gameboardView) => {
  const ship = gameboard.getShipAt(indexRowCol);
  const occupiedCellsRowCols = gameboard.getCellsOccupiedByShip(ship);
  occupiedCellsRowCols.forEach((rowCol) => {
    const [row, col] = rowCol;
    const shipInfo = gameboard.getShipInfoAt(rowCol);
    const targetCell = gameboardView.querySelector(
      `div[data-row="${row}"][data-col="${col}"]`,
    );
    applyShipSegmentStyle(targetCell, shipInfo);
    targetCell.classList.add('ship');
  });
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
    const occupiedShipInfo = gameboard.getShipInfoAt(rowCol);
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
    const ship = gameboard.getShipAt(indexRowCol);
    if (ship.hasSunk()) {
      dispatchShipSunkEvent(gameboard, window, true);
      applySunkShipStyle(gameboard, gameboardView, ship);
      if (gameboard.getNumberOfShips() === 0) {
        const gameOverEvent = new CustomEvent('gameOver');
        window.dispatchEvent(gameOverEvent);
        const playerWonEvent = new CustomEvent('userWon');
        window.dispatchEvent(playerWonEvent);
      }
    }
  });
};

const createCell = (gameboardView, gameboard, forMachine, rowCol) => {
  const view = document.createElement('div');
  view.classList.add('cell');
  view.setAttribute('data-row', rowCol[0]);
  view.setAttribute('data-col', rowCol[1]);
  if (forMachine) {
    view.classList.add('for-machine');
    setClickEventListenerForShipCell(view, gameboard, gameboardView, rowCol);
  } else {
    let shipSize = 5;
    let isVertical = true;
    window.addEventListener('newShipDirectionTypeChanged', (event) => {
      isVertical = event.detail.isVertical;
    });
    window.addEventListener('newShipTypeChanged', (event) => {
      shipSize = event.detail.shipSize;
    });
    window.addEventListener('allShipsPlaced', () => {
      view.classList.add('disabled');
    });
    view.addEventListener('click', () => {
      const [x, y] = gameboard.indexRowColToCoordinates(rowCol);
      gameboard.placeShipAt([x, y], isVertical, shipSize);
      applyShipStyle(rowCol, gameboard, gameboardView);
      const userShipPlaced = new CustomEvent('userShipPlaced');
      window.dispatchEvent(userShipPlaced);
    });
  }
  return view;
};

const createGameboardView = (gameboard, forMachine) => {
  const view = document.createElement('div');
  view.classList.add('gameboard');
  const [row, col] = gameboard.getSize();
  for (let i = 0; i < row; ++i) {
    for (let j = 0; j < col; ++j) {
      const cell = createCell(view, gameboard, forMachine, [i, j]);
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
