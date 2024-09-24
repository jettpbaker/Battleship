import Gameboard from './gameboard';

class Player {
  constructor() {
    this.gameboard = new Gameboard();
  }

  attack(opponent, x, y) {
    opponent.gameboard.receiveAttack(x, y);
  }
}

class HumanPlayer extends Player {
  attack(opponent, x, y) {
    super.attack(opponent, x, y);
  }
}

class ComputerPlayer extends Player {
  attack(opponent) {
    const x = Math.floor(Math.random() * 10);
    const y = Math.floor(Math.random() * 10);

    setTimeout(() => {
      super.attack(opponent, x, y);
    }, 1500);
  }
}

export { HumanPlayer, ComputerPlayer };
