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

    this.renderPlayerBoard();
    this.renderComputerBoard();

    this.humanTurn = true;
  }

  resetGame = () => {
    const winScreen = document.querySelector('#winScreen');
    winScreen.classList.add('hidden');

    const tiles = document.querySelectorAll('.tile');

    tiles.forEach((tile) => {
      tile.classList.remove('ship');
      tile.classList.remove('hit');
      tile.classList.remove('sunk');
    });

    this.players.human = new HumanPlayer();
    this.players.computer = new ComputerPlayer();

    this.players.human.gameboard.randomizeShips();
    this.players.computer.gameboard.randomizeShips();

    this.renderPlayerBoard();
    this.renderComputerBoard();

    this.humanTurn = true;
  };

  checkWin(turn) {
    let ships;
    let sunkShips = [];
    let tileElements;
    if (turn === this.human) {
      ships = this.players.computer.gameboard.ships;
      tileElements = document.querySelector('#computerBoard').children;
    } else {
      ships = this.players.human.gameboard.ships;
      tileElements = document.querySelector('#playerBoard').children;
    }

    ships.forEach((ship) => {
      console.log(ship);
      if (ship.sunk === true) {
        sunkShips.push(ship);
      }
    });

    if (sunkShips.length === 5) {
      for (let i = 0; i <= 99; i++) {
        tileElements[i].removeEventListener('click', this.playerAttack);
      }
      const showWinScreen = () => {
        const winScreen = document.querySelector('#winScreen');
        const winnerText = document.querySelector('#winnerText');
        if (turn === this.human) {
          winnerText.textContent = 'You Won!';
        } else {
          winnerText.textContent = 'You Lost!';
        }
        const winButton = winScreen.querySelector('#winButton');
        winButton.addEventListener('click', this.resetGame);

        winScreen.classList.remove('hidden');
      };

      setTimeout(() => {
        showWinScreen();
      }, 1000);
    } else {
      return;
    }
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
    const tileElements = event.target.parentElement.children;
    if (this.humanTurn !== true) {
      return;
    }
    if (event.target.classList.contains('hit')) {
      return;
    }

    const targetTileClass = event.target.classList[0];
    let targetTile = targetTileClass.replace(/\D/g, '');
    targetTile = Number(targetTile) - 1;
    targetTile = targetTile.toString();

    let targetTileX;
    let targetTileY;

    if (targetTile.length === 1) {
      targetTileX = Number(targetTile);
      targetTileY = 0;
    } else if (targetTile.length === 2) {
      targetTileX = Number(targetTile[1]);
      targetTileY = Number(targetTile[0]);
    } else {
      throw new Error('Invalid target tile length!');
    }

    event.target.classList.add('hit');

    const attackTiles = this.players.human.attack(
      this.players.computer,
      targetTileX,
      targetTileY
    );

    console.log(attackTiles.xy);

    if (attackTiles.ship !== false) {
      const sunk = this.players.computer.gameboard.isSunk(attackTiles.xy);
      if (sunk !== false) {
        const shipTiles = this.players.computer.gameboard.getTiles(sunk);

        shipTiles.forEach((tile) => {
          let tileValue = Number(`${tile[1]}${tile[0]}`);
          tileElements[tileValue].classList.add('sunk');
        });
      }
    }
    this.checkWin(this.human);
    this.humanTurn = false;
    this.computerAttack();
  };

  async computerAttack() {
    const tileElements = document.querySelector('#playerBoard').children;

    const attackTiles = await this.players.computer.attack(this.players.human);

    const targetTile = attackTiles.xy;
    const targetTileValue = Number(`${targetTile[1]}${targetTile[0]}`);
    if (tileElements[targetTileValue].classList.contains('hit')) {
      this.computerAttack();
    } else {
      tileElements[targetTileValue].classList.add('hit');

      if (attackTiles.ship !== false) {
        const sunk = this.players.human.gameboard.isSunk(attackTiles.xy);
        if (sunk !== false) {
          const shipTiles = this.players.human.gameboard.getTiles(sunk);

          shipTiles.forEach((tile) => {
            let tileValue = Number(`${tile[1]}${tile[0]}`);
            tileElements[tileValue].classList.add('sunk');
          });
        }
      }

      this.humanTurn = true;
    }
  }
}

export { Game };
