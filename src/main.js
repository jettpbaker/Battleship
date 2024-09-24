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
}

startGameButton.addEventListener('click', loadNewGame);
