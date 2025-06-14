import { Train } from './Train.js';
import { Obstacle } from './Obstacle.js';
import { Coal } from './Coal.js';
import { Background } from './Background.js';
import { InputHandler } from './InputHandler.js';

export class Game {
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.width = canvas.width;
    this.height = canvas.height;
    
    this.gameState = 'menu'; // menu, playing, gameOver
    this.score = 0;
    this.gameSpeed = 2;
    this.maxGameSpeed = 8;
    
    this.train = new Train(this);
    this.background = new Background(this);
    this.inputHandler = new InputHandler(this);
    
    this.obstacles = [];
    this.coals = [];
    
    this.obstacleTimer = 0;
    this.coalTimer = 0;
    this.scoreTimer = 0;
    
    this.onGameOver = null;
    this.onUIUpdate = null;
    
    this.lastTime = 0;
  }
  
  init() {
    this.gameLoop(0);
  }
  
  start() {
    this.gameState = 'playing';
    this.score = 0;
    this.gameSpeed = 2;
    this.train.reset();
    this.obstacles = [];
    this.coals = [];
    this.obstacleTimer = 0;
    this.coalTimer = 0;
    this.scoreTimer = 0;
  }
  
  restart() {
    this.gameState = 'menu';
    this.start();
  }
  
  update(deltaTime) {
    if (this.gameState !== 'playing') return;
    
    // Update background
    this.background.update(deltaTime);
    
    // Update train
    this.train.update(deltaTime);
    
    // Update obstacles
    this.obstacles.forEach(obstacle => obstacle.update(deltaTime));
    this.obstacles = this.obstacles.filter(obstacle => !obstacle.markedForDeletion);
    
    // Update coal
    this.coals.forEach(coal => coal.update(deltaTime));
    this.coals = this.coals.filter(coal => !coal.markedForDeletion);
    
    // Spawn obstacles
    this.obstacleTimer += deltaTime;
    if (this.obstacleTimer > 2000 - this.gameSpeed * 100) {
      this.obstacles.push(new Obstacle(this));
      this.obstacleTimer = 0;
    }
    
    // Spawn coal
    this.coalTimer += deltaTime;
    if (this.coalTimer > 3000) {
      this.coals.push(new Coal(this));
      this.coalTimer = 0;
    }
    
    // Check collisions
    this.checkCollisions();
    
    // Update score
    this.scoreTimer += deltaTime;
    if (this.scoreTimer > 100) {
      this.score += Math.floor(this.train.speed / 10);
      this.scoreTimer = 0;
    }
    
    // Increase game speed gradually
    if (this.gameSpeed < this.maxGameSpeed) {
      this.gameSpeed += 0.001;
    }
    
    // Update UI
    if (this.onUIUpdate) {
      this.onUIUpdate(this.score, this.train.fuel, this.train.speed);
    }
    
    // Check game over conditions
    if (this.train.fuel <= 0 || this.train.crashed) {
      this.gameOver();
    }
  }
  
  checkCollisions() {
    // Check obstacle collisions
    this.obstacles.forEach(obstacle => {
      if (this.train.collidesWith(obstacle)) {
        if (this.train.speed > 30) {
          this.train.crashed = true;
        } else {
          this.train.speed = Math.max(0, this.train.speed - 20);
          obstacle.markedForDeletion = true;
          this.score += 50; // Bonus for careful navigation
        }
      }
    });
    
    // Check coal collisions
    this.coals.forEach(coal => {
      if (this.train.collidesWith(coal)) {
        this.train.fuel = Math.min(100, this.train.fuel + 25);
        coal.markedForDeletion = true;
        this.score += 100;
      }
    });
  }
  
  gameOver() {
    this.gameState = 'gameOver';
    if (this.onGameOver) {
      this.onGameOver(this.score);
    }
  }
  
  draw() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    
    // Draw background
    this.background.draw(this.ctx);
    
    if (this.gameState === 'playing') {
      // Draw obstacles
      this.obstacles.forEach(obstacle => obstacle.draw(this.ctx));
      
      // Draw coal
      this.coals.forEach(coal => coal.draw(this.ctx));
      
      // Draw train
      this.train.draw(this.ctx);
    }
  }
  
  gameLoop(timeStamp) {
    const deltaTime = timeStamp - this.lastTime;
    this.lastTime = timeStamp;
    
    this.update(deltaTime);
    this.draw();
    
    requestAnimationFrame(this.gameLoop.bind(this));
  }
}