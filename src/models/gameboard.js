const createGameboard = () => {
  const grid = Array.from(new Array(10), () =>
    Array.from(new Array(10), () => null),
  );
  const missedShots = [];
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
  const placeShipAt = (point, vertical, ship) => {
    let [x, y] = pointToIndices(point);
    if (grid[x][y] !== null) throw new Error("Ships can't overlap");
    shipPlacements.push([x, y]);
    for (let i = 0; i < ship.getLength(); ++i) {
      grid[x][y] = ship;
      if (vertical) {
        ++x;
      } else {
        ++y;
      }
    }
  };

  const receiveAttack = (point) => {
    const [x, y] = pointToIndices(point);
    if (hitPlaces.some((place) => place[0] === x && place[1] === y)) {
      throw new Error("Can't hit the same location more than once");
    }
    hitPlaces.push([x, y]);
    if (grid[x][y] === null) {
      missedShots.push([x, y]);
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

  return { placeShipAt, receiveAttack, allShipsHaveSunk };
};

export default createGameboard;
