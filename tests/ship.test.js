import Ship from '../src/ship';

test('Ship is correct length', () => {
  const shortShip = new Ship(3);
  expect(shortShip.length).toBe(3);
  const longShip = new Ship(5);
  expect(longShip.length).toBe(5);
});

test('Hit ship multiple times', () => {
  const ship = new Ship(3);
  ship.hit();
  expect(ship.hits).toBe(1);
  ship.hit();
  expect(ship.hits).toBe(2);
});

test('Ship sinks when hits equal length', () => {
  const ship = new Ship(3);
  ship.hit();
  ship.hit();
  ship.hit();
  expect(ship.sunk).toBe(true);
});

test("Ship doesn't sink when hits don't equal length", () => {
  const ship = new Ship(3);
  ship.hit();
  expect(ship.sunk).toBe(false);
});
