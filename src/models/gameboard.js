import { AttackResult } from '../utils';
import createShip from './ship';

const ShipSegmentType = {
  STAND_ALONE: 0,
  HEAD: 1,
  MIDDLE: 2,
  TAIL: 3,
};

const createGameboard = () => {
  const ROW_LENGTH = 10;
  const COLUMN_LENGTH = 10;
  const getSize = () => [ROW_LENGTH, COLUMN_LENGTH];
  const grid = Array.from(new Array(ROW_LENGTH), () =>
    Array.from(new Array(COLUMN_LENGTH), () => null),
  );
  const missedAttackCoordinatesList = [];
  const shipCoordinatesList = [];
  const hitCoordinatesList = [];
  let numOfShips = 0;
  const getGrid = () => grid;
  const getNumberOfShips = () => numOfShips;
  const columnNameToIndex = (alphabet) => {
    const code = alphabet.toUpperCase().charCodeAt(0);
    const maxCode = 'J'.toUpperCase().charCodeAt(0);
    if (code > maxCode) throw new Error('Invalid column name');
    const baseCode = 'A'.toUpperCase().charCodeAt(0);
    return code - baseCode;
  };
  const indexToColumnName = (index) => {
    const maxIndex = 9;
    if (index > maxIndex) throw new Error('Index out of bounds');
    const baseCode = 'A'.charCodeAt(0);
    return String.fromCharCode(baseCode + index);
  };
  const coordinatesToIndices = (coordinates) => {
    const x = coordinates[0] - 1;
    const y = columnNameToIndex(coordinates[1]);
    return [x, y];
  };

  const indicesToCoordinates = (indices) => {
    const x = indices[0] + 1;
    const y = indexToColumnName(indices[1]);
    return [x, y];
  };
  const shipCanBePlacedAt = (x, y, ship, vertical) => {
    for (let i = 0; i < ship.getLength(); ++i) {
      if (grid[x][y] !== null) return false;
      if (vertical) ++x;
      else ++y;
    }
    return true;
  };
  const placeShipAt = (coordinates, vertical, length) => {
    const ship = createShip(length);
    const [headX, headY] = coordinatesToIndices(coordinates);
    let x = headX;
    let y = headY;
    if (!shipCanBePlacedAt(x, y, ship, vertical)) {
      throw new Error("Ships can't overlap");
    }
    shipCoordinatesList.push([x, y]);
    ++numOfShips;
    for (let i = 0; i < ship.getLength(); ++i) {
      const info = {
        isVertical: vertical,
        type:
          ship.getLength() === 1
            ? ShipSegmentType.STAND_ALONE
            : x === headX && y === headY
              ? ShipSegmentType.HEAD
              : i === ship.getLength() - 1
                ? ShipSegmentType.TAIL
                : ShipSegmentType.MIDDLE,
      };
      grid[x][y] = [ship, info];
      if (vertical) ++x;
      else ++y;
    }
  };

  const receiveAttack = (coordinates) => {
    if (
      hitCoordinatesList.some(
        (place) => place[0] === coordinates[0] && place[1] === coordinates[1],
      )
    ) {
      return AttackResult.REDUNDANT;
    }
    hitCoordinatesList.push(coordinates);
    const [x, y] = coordinatesToIndices(coordinates);
    if (grid[x][y] === null) {
      missedAttackCoordinatesList.push(coordinates);
      return AttackResult.FAILED;
    }
    const ship = grid[x][y][0];
    ship.takeHit();
    if (ship.hasSunk()) --numOfShips;
    return AttackResult.SUCCESSFUL;
  };
  const allShipsHaveSunk = () => {
    for (let i = 0; i < shipCoordinatesList.length; ++i) {
      const [x, y] = shipCoordinatesList[i];
      if (!grid[x][y][0].hasSunk()) return false;
    }
    return true;
  };
  const getMissedAttackCoordinatesList = () => missedAttackCoordinatesList;
  const getCellsOccupiedByShip = (ship) => {
    const arr = [];
    for (let i = 0; i < ROW_LENGTH; ++i) {
      for (let j = 0; j < COLUMN_LENGTH; ++j) {
        if (grid[i][j] !== null && grid[i][j][0] === ship) arr.push([i, j]);
      }
    }
    return arr;
  };

  return {
    getSize,
    placeShipAt,
    receiveAttack,
    allShipsHaveSunk,
    getMissedAttackCoordinatesList,
    getGrid,
    getNumberOfShips,
    coordinatesToIndices,
    indicesToCoordinates,
    getCellsOccupiedByShip,
  };
};

export { createGameboard, ShipSegmentType };
