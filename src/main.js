import './style.css';
import { Game } from './game/Game.js';

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const game = new Game(canvas, ctx);

// UI elements
const startBtn = document.getElementById('startBtn');
const restartBtn = document.getElementById('restartBtn');
const gameOverDiv = document.getElementById('gameOver');

startBtn.addEventListener('click', () => {
  game.start();
  startBtn.style.display = 'none';
  document.getElementById('instructions').style.display = 'none';
});

restartBtn.addEventListener('click', () => {
  game.restart();
  gameOverDiv.style.display = 'none';
  startBtn.style.display = 'block';
  document.getElementById('instructions').style.display = 'block';
});

// Handle game over
game.onGameOver = (finalScore) => {
  document.getElementById('finalScore').textContent = `Final Score: ${finalScore}`;
  gameOverDiv.style.display = 'block';
};

// Handle UI updates
game.onUIUpdate = (score, fuel, speed) => {
  document.getElementById('score').textContent = `Score: ${score}`;
  document.getElementById('fuel').textContent = `Fuel: ${Math.round(fuel)}%`;
  document.getElementById('speed').textContent = `Speed: ${Math.round(speed)} mph`;
};

// Start the game loop
game.init();