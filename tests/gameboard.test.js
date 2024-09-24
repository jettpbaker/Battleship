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
