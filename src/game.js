import { HumanPlayer, ComputerPlayer } from './player';

class Game {
  constructor() {
    this.players = {
      human: undefined,
      computer: undefined,
    };
    this.turn = undefined;
  }

  startGame() {
    this.players.human = new HumanPlayer();
    this.players.computer = new ComputerPlayer();

    this.players.human.gameboard.randomizeShips();
    this.players.computer.gameboard.randomizeShips();
    console.log(this.players);

    this.renderPlayerBoard();
    this.renderComputerBoard();

    this.turn = this.players.human;
  }

  resetGame() {
    this.players.human = undefined;
    this.players.human = new HumanPlayer();
    this.players.computer = undefined;
    this.players.computer = new ComputerPlayer();
    this.turn = undefined;
    this.turn = this.players.human;
  }

  nextTurn() {
    this.turn =
      this.turn === this.players.human
        ? this.players.computer
        : this.players.human;
  }

  renderPlayerBoard() {
    this.renderBoard(this.players.human.gameboard.board, '#playerBoard');
  }

  renderComputerBoard() {
    this.renderBoard(this.players.computer.gameboard.board, '#computerBoard');
  }

  renderBoard(board, boardSelectorID) {
    let tiles = [];
    for (let i = 0; i <= board.length - 1; i++) {
      for (let j = 0; j <= board[i].length - 1; j++) {
        if (board[i][j].ship !== null) {
          let tile = Number(`${i}${j}`);
          tiles.push(tile);
        }
      }
    }
    const boardElement = document.querySelector(boardSelectorID);
    const tileElements = boardElement.children;
    tiles.forEach((tile) => {
      tileElements[tile].classList.add('ship');
    });
  }

  playerAttack(x, y) {
    if (this.turn !== this.players.human) {
      return;
    }
  }
}

export { Game };
