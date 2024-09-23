import Gameboard from '../src/gameboard';

test('Place ship', () => {
  const gameboard = new Gameboard();
  gameboard.place();
  expect(gameboard.tile.ship).toBe(true);
});
