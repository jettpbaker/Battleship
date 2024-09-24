import './styles.css';
import { Game } from './game';

const game = new Game();

const preGameView = document.querySelector('#preGame');
const inGameView = document.querySelector('#playArea');
const startGameButton = document.querySelector('#startGame');

function loadNewGame() {
  function log() {
    console.log('test');
  }

  preGameView.classList.add('hidden');
  inGameView.classList.remove('hidden');
  game.startGame();

  const computerBoardElement = document.querySelector('#computerBoard');
  const tileElements = computerBoardElement.querySelectorAll('.tile');
  console.log(tileElements);
  tileElements.forEach((tile) => {
    tile.addEventListener('click', game.playerAttack);
  });
}

startGameButton.addEventListener('click', loadNewGame);
