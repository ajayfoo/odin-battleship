import { createGameboard, ShipSegmentType } from '../src/models/gameboard';
import { AttackResult } from '../src/utils';

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

test('Return FAILED AttackResult result for a failed attack on ship', () => {
  const gameboard = createGameboard();
  expect(gameboard.receiveAttack([1, 'A'])).toBe(AttackResult.FAILED);
});

test('Return SUCCESSFUL AttackResult result for a successful attack on ship', () => {
  const gameboard = createGameboard();
  gameboard.placeShipAt([1, 'A'], false, 2);
  expect(gameboard.receiveAttack([1, 'A'])).toBe(AttackResult.SUCCESSFUL);
});

test('Return REDUNDANT AttackResult result for a successful attack on ship', () => {
  const gameboard = createGameboard();
  gameboard.placeShipAt([1, 'A'], false, 2);
  gameboard.receiveAttack([1, 'A']);
  expect(gameboard.receiveAttack([1, 'A'])).toBe(AttackResult.REDUNDANT);
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

test('Get number of ships', () => {
  const gameboard = createGameboard();
  gameboard.placeShipAt([1, 'A'], false, 2);
  gameboard.placeShipAt([2, 'A'], true, 1);
  expect(gameboard.getNumberOfShips()).toBe(2);
  gameboard.receiveAttack([2, 'A']);
  gameboard.receiveAttack([3, 'A']);
  expect(gameboard.getNumberOfShips()).toBe(1);
});

test('Get cells occupied by a ship ', () => {
  const gameboard = createGameboard();

  const coordinates1 = [1, 'A'];
  gameboard.placeShipAt(coordinates1, false, 2);
  let [i, j] = gameboard.coordinatesToIndices(coordinates1);
  const expectedCellsOccupied1 = [
    [i, j],
    [i, j + 1],
  ];
  const ship1 = gameboard.getShipAt([i, j]);
  expect(gameboard.getCellsOccupiedByShip(ship1)).toStrictEqual(
    expectedCellsOccupied1,
  );

  const coordinates2 = [2, 'A'];
  gameboard.placeShipAt(coordinates2, true, 3);
  [i, j] = gameboard.coordinatesToIndices(coordinates2);
  const expectedCellsOccupied2 = [
    [i, j],
    [i + 1, j],
    [i + 2, j],
  ];
  const ship2 = gameboard.getShipAt([i, j]);
  expect(gameboard.getCellsOccupiedByShip(ship2)).toStrictEqual(
    expectedCellsOccupied2,
  );
});

test('Get ship at a particular cell', () => {
  const gameboard = createGameboard();
  gameboard.placeShipAt([1, 'A'], false, 2);
  gameboard.placeShipAt([2, 'A'], true, 1);
  const indexRowCol1 = gameboard.coordinatesToIndices([1, 'A']);
  const indexRowCol2 = gameboard.coordinatesToIndices([2, 'A']);
  expect(gameboard.getShipAt(indexRowCol1).getLength()).toBe(2);
  expect(gameboard.getShipAt(indexRowCol2).getLength()).toBe(1);
});

test('Get ship info from the cell', () => {
  const gameboard = createGameboard();
  gameboard.placeShipAt([1, 'A'], false, 2);
  gameboard.placeShipAt([2, 'A'], true, 1);
  expect(gameboard.getShipInfoAt([0, 0])).toStrictEqual({
    isVertical: false,
    type: ShipSegmentType.HEAD,
  });
  expect(gameboard.getShipInfoAt([0, 1])).toStrictEqual({
    isVertical: false,
    type: ShipSegmentType.TAIL,
  });
  expect(gameboard.getShipInfoAt([1, 0])).toStrictEqual({
    isVertical: true,
    type: ShipSegmentType.STAND_ALONE,
  });
});
