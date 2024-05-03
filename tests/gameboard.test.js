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
