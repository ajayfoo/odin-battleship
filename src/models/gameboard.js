import createShip from '../models/ship';

const createGameboard = () => {
  const grid = Array.from(new Array(10), () =>
    Array.from(new Array(10), () => null),
  );
  const missedAttacksPoints = [];
  const shipPlacements = [];
  const hitPlaces = [];
  const columnNameToIndex = (alphabet) => {
    const code = alphabet.toUpperCase().charCodeAt(0);
    const maxCode = 'J'.toUpperCase().charCodeAt(0);
    if (code > maxCode) throw new Error('Invalid column name');
    const baseCode = 'A'.toUpperCase().charCodeAt(0);
    return code - baseCode;
  };
  const pointToIndices = (point) => {
    const x = point[0] - 1;
    const y = columnNameToIndex(point[1]);
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

  const placeShipAt = (point, vertical, length) => {
    const ship = createShip(length);
    let [x, y] = pointToIndices(point);
    if (!shipCanBePlacedAt(x, y, ship, vertical)) {
      throw new Error("Ships can't overlap");
    }
    shipPlacements.push([x, y]);
    for (let i = 0; i < ship.getLength(); ++i) {
      grid[x][y] = ship;
      if (vertical) ++x;
      else ++y;
    }
  };

  const receiveAttack = (point) => {
    if (
      hitPlaces.some((place) => place[0] === point[0] && place[1] === point[1])
    ) {
      throw new Error("Can't hit the same location more than once");
    }
    hitPlaces.push(point);
    const [x, y] = pointToIndices(point);
    if (grid[x][y] === null) {
      missedAttacksPoints.push(point);
      return;
    }
    grid[x][y].takeHit();
  };
  const allShipsHaveSunk = () => {
    for (let i = 0; i < shipPlacements.length; ++i) {
      const [x, y] = shipPlacements[i];
      if (!grid[x][y].hasSunk()) return false;
    }
    return true;
  };
  const getMissedAttacksPoints = () => missedAttacksPoints;

  return {
    placeShipAt,
    receiveAttack,
    allShipsHaveSunk,
    getMissedAttacksPoints,
  };
};

export default createGameboard;
