import { HumanPlayer, ComputerPlayer } from './player';

class Game {
  constructor() {
    this.players = {
      human: new HumanPlayer(),
      computer: new ComputerPlayer(),
    };
    this.turn = human;
  }

  startGame() {}

  resetGame() {}

  nextTurn() {
    this.turn === human ? (this.turn = computer) : (this.turn = human);
  }
}
