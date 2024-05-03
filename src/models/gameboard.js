import createShip from './ship';

const createGameboard = () => {
  const grid = Array.from(new Array(10), () =>
    Array.from(new Array(10), () => null),
  );
  const missedAttackCoordinatesList = [];
  const shipCoordinatesList = [];
  const hitCoordinatesList = [];
  const columnNameToIndex = (alphabet) => {
    const code = alphabet.toUpperCase().charCodeAt(0);
    const maxCode = 'J'.toUpperCase().charCodeAt(0);
    if (code > maxCode) throw new Error('Invalid column name');
    const baseCode = 'A'.toUpperCase().charCodeAt(0);
    return code - baseCode;
  };
  const coordinatesToIndices = (coordinates) => {
    const x = coordinates[0] - 1;
    const y = columnNameToIndex(coordinates[1]);
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
    let [x, y] = coordinatesToIndices(coordinates);
    if (!shipCanBePlacedAt(x, y, ship, vertical)) {
      throw new Error("Ships can't overlap");
    }
    shipCoordinatesList.push([x, y]);
    for (let i = 0; i < ship.getLength(); ++i) {
      grid[x][y] = ship;
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
      throw new Error("Can't hit the same location more than once");
    }
    hitCoordinatesList.push(coordinates);
    const [x, y] = coordinatesToIndices(coordinates);
    if (grid[x][y] === null) {
      missedAttackCoordinatesList.push(coordinates);
      return;
    }
    grid[x][y].takeHit();
  };
  const allShipsHaveSunk = () => {
    for (let i = 0; i < shipCoordinatesList.length; ++i) {
      const [x, y] = shipCoordinatesList[i];
      if (!grid[x][y].hasSunk()) return false;
    }
    return true;
  };
  const getMissedAttackCoordinatesList = () => missedAttackCoordinatesList;

  return {
    placeShipAt,
    receiveAttack,
    allShipsHaveSunk,
    getMissedAttackCoordinatesList,
  };
};

export default createGameboard;
