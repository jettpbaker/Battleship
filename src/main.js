import './styles.css';
import { Game } from './game';

const game = new Game();

const preGameView = document.querySelector('#preGame');
const inGameView = document.querySelector('#playArea');
const startGameButton = document.querySelector('#startGame');

function loadNewGame() {
  preGameView.classList.add('hidden');
  inGameView.classList.remove('hidden');
  game.startGame();

  const computerBoardElement = document.querySelector('#computerBoard');
  const tileElements = computerBoardElement.querySelectorAll('.tile');
  console.log(tileElements);
  tileElements.forEach((tile) => {
    tile.addEventListener('click', game.playerAttack);
  });

  const resetGameButton = document.querySelector('#resetGame');
  resetGameButton.addEventListener('click', game.resetGame);
}

startGameButton.addEventListener('click', loadNewGame);
