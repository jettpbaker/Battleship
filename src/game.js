import { HumanPlayer, ComputerPlayer } from './player';

class Game {
  constructor() {
    this.players = {
      human: undefined,
      computer: undefined,
    };
    this.humanTurn = undefined;
  }

  startGame() {
    this.players.human = new HumanPlayer();
    this.players.computer = new ComputerPlayer();

    this.players.human.gameboard.randomizeShips();
    this.players.computer.gameboard.randomizeShips();
    console.log(this.players);

    this.renderPlayerBoard();
    this.renderComputerBoard();

    this.humanTurn = true;
  }

  resetGame() {
    this.players.human = new HumanPlayer();
    this.players.computer = new ComputerPlayer();
    this.humanTurn = true;
  }

  nextTurn() {
    this.humanTurn = this.humanTurn === true ? false : true;
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

  playerAttack = (event) => {
    if (this.humanTurn !== true) {
      return;
    }

    console.log(event);
  };
}

export { Game };
