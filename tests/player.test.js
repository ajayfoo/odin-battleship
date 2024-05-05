import createPlayer from '../src/models/player';

test('Get player name', () => {
  const expectedName = 'Roy';
  const player = createPlayer(expectedName);
  expect(player.getName()).toBe(expectedName);
});
