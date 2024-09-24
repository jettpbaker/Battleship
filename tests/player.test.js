import { HumanPlayer, ComputerPlayer } from '../src/player';

let human;
let computer;

beforeEach(() => {
  human = new HumanPlayer();
  computer = new ComputerPlayer();
});

test('Human attacks computer', () => {
  human.attack(computer, 0, 0);
  expect(computer.gameboard.board[0][0].isHit).toBe(true);
});

test('Computer randomly attacks', () => {
  const attackSpy = jest.spyOn(computer, 'attack');
  computer.attack(human);
  expect(attackSpy).toBeCalled();
});
