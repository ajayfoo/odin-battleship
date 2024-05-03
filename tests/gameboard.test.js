import createShip from '../src/models/ship';
import createGameboard from '../src/models/gameboard';

test('Sink one ships', () => {
  const gameboard = createGameboard();
  gameboard.placeShipAt([1, 'A'], false, createShip(2));
  gameboard.receiveAttack([1, 'A']);
  gameboard.receiveAttack([1, 'B']);
  expect(gameboard.allShipsHaveSunk()).toBe(true);
});

test('Sink two ships', () => {
  const gameboard = createGameboard();
  gameboard.placeShipAt([1, 'A'], false, createShip(2));
  gameboard.placeShipAt([3, 'J'], true, createShip(2));
  gameboard.receiveAttack([1, 'A']);
  gameboard.receiveAttack([1, 'B']);
  gameboard.receiveAttack([3, 'J']);
  gameboard.receiveAttack([4, 'J']);
  expect(gameboard.allShipsHaveSunk()).toBe(true);
});

test('Throw error when placing ship on a ship that has the same placement', () => {
  const gameboard = createGameboard();
  gameboard.placeShipAt([1, 'A'], false, createShip(2));
  expect(() => gameboard.placeShipAt([1, 'A'], true, createShip(2))).toThrow(
    new Error("Ships can't overlap"),
  );
});

test('Throw error when placing ship that will over overlap with another ship', () => {
  const gameboard = createGameboard();
  gameboard.placeShipAt([1, 'B'], false, createShip(2));
  expect(() => gameboard.placeShipAt([1, 'C'], true, createShip(2))).toThrow(
    new Error("Ships can't overlap"),
  );
  expect(() => gameboard.placeShipAt([1, 'A'], false, createShip(2))).toThrow(
    new Error("Ships can't overlap"),
  );
});

test('Throw error when hit on the same location', () => {
  const gameboard = createGameboard();
  gameboard.placeShipAt([1, 'A'], false, createShip(2));
  gameboard.receiveAttack([1, 'A']);
  expect(() => gameboard.receiveAttack([1, 'A'])).toThrow(
    new Error("Can't hit the same location more than once"),
  );
});
