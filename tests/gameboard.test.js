import Gameboard from '../src/gameboard';

test('Place legal ship horizontally', () => {
  const gameboard = new Gameboard();
  gameboard.place(3, 0, 'horizontal', 4);
  expect(gameboard.board[0][3].ship).toEqual({
    hits: 0,
    length: 4,
    sunk: false,
  });
  expect(gameboard.board[0][6].ship).toEqual({
    hits: 0,
    length: 4,
    sunk: false,
  });
});

test('Place legal ship vertically', () => {
  const gameboard = new Gameboard();
  gameboard.place(0, 0, 'vertical', 5);
  expect(gameboard.board[0][0].ship).toEqual({
    hits: 0,
    length: 5,
    sunk: false,
  });
  expect(gameboard.board[4][0].ship).toEqual({
    hits: 0,
    length: 5,
    sunk: false,
  });
});

test('Place ship out of bounds horizontally', () => {
  const gameboard = new Gameboard();
  expect(() => {
    gameboard.place(7, 0, 'horizontal', 5);
  }).toThrow('Trying to place ship out of bounds!');
});

test('Place ship out of bounds vertically', () => {
  const gameboard = new Gameboard();
  expect(() => {
    gameboard.place(0, 7, 'vertical', 5);
  }).toThrow('Trying to place ship out of bounds!');
});

test('Place ship on another ship', () => {
  const gameboard = new Gameboard();
  gameboard.place(0, 0, 'vertical', 5);
  expect(() => {
    gameboard.place(0, 2, 'horizontal', 5);
  }).toThrow('Ship already placed here!');
});

test('Place no ship', () => {
  const gameboard = new Gameboard();
  expect(gameboard.board[9][9].ship).toBe(null);
});

test('Hit empty tile', () => {
  const gameboard = new Gameboard();
  gameboard.receiveAttack(0, 0);
  expect(gameboard.board[0][0].isHit).toBe(true);
});

test('Hit tile with a ship', () => {
  const gameboard = new Gameboard();
  gameboard.place(0, 0, 'vertical', 5);
  gameboard.receiveAttack(0, 1);
  expect(gameboard.board[1][0].isHit).toBe(true);
  expect(gameboard.board[1][0].ship).toEqual({
    hits: 1,
    length: 5,
    sunk: false,
  });
});

test('Sink a ship', () => {
  const gameboard = new Gameboard();
  gameboard.place(6, 5, 'vertical', 2);
  gameboard.place(0, 0, 'vertical', 2);
  gameboard.receiveAttack(0, 0);
  gameboard.receiveAttack(0, 1);
  expect(gameboard.sunk()).toBe('1 ships sunk!');
});

test('Sink all ships', () => {
  const gameboard = new Gameboard();
  gameboard.place(0, 0, 'vertical', 2);
  gameboard.receiveAttack(0, 0);
  gameboard.receiveAttack(0, 1);
  expect(gameboard.sunk()).toBe('All ships sunk!');
});
