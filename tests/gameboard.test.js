import createGameboard from '../src/models/gameboard';

test('Sink one ships', () => {
  const gameboard = createGameboard();
  gameboard.placeShipAt([1, 'A'], false, 2);
  gameboard.receiveAttack([1, 'A']);
  gameboard.receiveAttack([1, 'B']);
  expect(gameboard.allShipsHaveSunk()).toBe(true);
});

test('Sink two ships', () => {
  const gameboard = createGameboard();
  gameboard.placeShipAt([1, 'A'], false, 2);
  gameboard.placeShipAt([3, 'J'], true, 2);
  gameboard.receiveAttack([1, 'A']);
  gameboard.receiveAttack([1, 'B']);
  gameboard.receiveAttack([3, 'J']);
  gameboard.receiveAttack([4, 'J']);
  expect(gameboard.allShipsHaveSunk()).toBe(true);
});

test('Throw error when placing ship on a ship that has the same coordinates', () => {
  const gameboard = createGameboard();
  gameboard.placeShipAt([1, 'A'], false, 2);
  expect(() => gameboard.placeShipAt([1, 'A'], true, 2)).toThrow(
    new Error("Ships can't overlap"),
  );
});

test('Throw error when placing ship that will over overlap with another ship', () => {
  const gameboard = createGameboard();
  gameboard.placeShipAt([1, 'B'], false, 2);
  expect(() => gameboard.placeShipAt([1, 'C'], true, 2)).toThrow(
    new Error("Ships can't overlap"),
  );
  expect(() => gameboard.placeShipAt([1, 'A'], false, 2)).toThrow(
    new Error("Ships can't overlap"),
  );
});

test('Throw error when hit on the same coordinates', () => {
  const gameboard = createGameboard();
  gameboard.placeShipAt([1, 'A'], false, 2);
  gameboard.receiveAttack([1, 'A']);
  expect(() => gameboard.receiveAttack([1, 'A'])).toThrow(
    new Error("Can't hit the same location more than once"),
  );
});

test('Get all missed attack coordinates', () => {
  const gameboard = createGameboard();
  const expectedMissedAttackCoordinates = [
    [1, 'A'],
    [2, 'A'],
    [3, 'A'],
    [4, 'A'],
  ];
  expectedMissedAttackCoordinates.forEach(gameboard.receiveAttack);
  expect(gameboard.getMissedAttackCoordinatesList()).toStrictEqual(
    expectedMissedAttackCoordinates,
  );
});

test('Get size', () => {
  const gameboard = createGameboard();
  expect(gameboard.getSize()).toStrictEqual([10, 10]);
});
