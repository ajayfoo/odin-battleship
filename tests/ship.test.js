import createShip from '../src/models/ship';

test('Get ship length', () => {
  const ship = createShip(2);
  expect(ship.getLength()).toBe(2);
});

test('Get health', () => {
  const ship = createShip(2);
  expect(ship.getHealth()).toBe(2);
});

test('Take hit', () => {
  const ship = createShip(2);
  ship.takeHit();
  expect(ship.getHealth()).toBe(1);
});

test('Sink ship', () => {
  const ship = createShip(2);
  ship.takeHit();
  ship.takeHit();
  expect(ship.hasSunk()).toBe(true);
});

test('Throw error after taking hit in sunken state', () => {
  const ship = createShip(2);
  ship.takeHit();
  ship.takeHit();
  expect(() => ship.takeHit()).toThrow(new Error("Can't hit sunken ship"));
});
