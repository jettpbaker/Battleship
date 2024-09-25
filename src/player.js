import Gameboard from './gameboard';

class Player {
  constructor() {
    this.gameboard = new Gameboard();
  }

  attack(opponent, x, y) {
    return opponent.gameboard.receiveAttack(x, y);
  }
}

class HumanPlayer extends Player {
  attack(opponent, x, y) {
    return super.attack(opponent, x, y);
  }
}

class ComputerPlayer extends Player {
  attack(opponent) {
    return new Promise((resolve) => {
      const x = Math.floor(Math.random() * 10);
      const y = Math.floor(Math.random() * 10);

      setTimeout(() => {
        const result = super.attack(opponent, x, y);
        resolve(result);
      }, 500);
    });
  }
}
export { HumanPlayer, ComputerPlayer };
