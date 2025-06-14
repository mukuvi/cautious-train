import { Train } from './Train.js';
import { AITrain } from './AITrain.js';
import { Obstacle } from './Obstacle.js';
import { Coal } from './Coal.js';
import { PowerUp } from './PowerUp.js';
import { Background } from './Background.js';
import { InputHandler } from './InputHandler.js';
import { Weather } from './Weather.js';
import { Leaderboard } from './Leaderboard.js';

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
    this.aiTrains = [];
    this.background = new Background(this);
    this.inputHandler = new InputHandler(this);
    this.weather = new Weather(this);
    this.leaderboard = new Leaderboard(this);
    
    this.obstacles = [];
    this.coals = [];
    this.powerUps = [];
    
    this.obstacleTimer = 0;
    this.coalTimer = 0;
    this.powerUpTimer = 0;
    this.aiTrainTimer = 0;
    this.scoreTimer = 0;
    
    this.onGameOver = null;
    this.onUIUpdate = null;
    
    this.lastTime = 0;
    
    this.initializeAITrains();
  }
  
  initializeAITrains() {
    const colors = ['#8B0000', '#006400', '#4B0082', '#FF8C00', '#8B4513', '#2F4F4F'];
    for (let i = 0; i < 5; i++) {
      const aiTrain = new AITrain(this, i % 3, colors[i]);
      this.aiTrains.push(aiTrain);
      this.leaderboard.addTrain(aiTrain);
    }
    this.leaderboard.addTrain(this.train, true);
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
    this.powerUps = [];
    this.obstacleTimer = 0;
    this.coalTimer = 0;
    this.powerUpTimer = 0;
    this.aiTrainTimer = 0;
    this.scoreTimer = 0;
    
    // Reset AI trains
    this.aiTrains.forEach(aiTrain => {
      aiTrain.x = -aiTrain.width - Math.random() * 200;
      aiTrain.speed = 15 + Math.random() * 25;
      aiTrain.fuel = 80 + Math.random() * 20;
      aiTrain.position = 0;
      aiTrain.markedForDeletion = false;
    });
  }
  
  restart() {
    this.gameState = 'menu';
    this.start();
  }
  
  update(deltaTime) {
    if (this.gameState !== 'playing') return;
    
    // Update weather
    this.weather.update(deltaTime);
    
    // Update background
    this.background.update(deltaTime);
    
    // Update train
    this.train.update(deltaTime);
    
    // Update AI trains
    this.aiTrains.forEach(aiTrain => aiTrain.update(deltaTime));
    this.aiTrains = this.aiTrains.filter(aiTrain => !aiTrain.markedForDeletion);
    
    // Spawn new AI trains
    this.aiTrainTimer += deltaTime;
    if (this.aiTrainTimer > 8000 && this.aiTrains.length < 5) {
      const colors = ['#8B0000', '#006400', '#4B0082', '#FF8C00', '#8B4513', '#2F4F4F'];
      const aiTrain = new AITrain(this, Math.floor(Math.random() * 3), colors[Math.floor(Math.random() * colors.length)]);
      this.aiTrains.push(aiTrain);
      this.leaderboard.addTrain(aiTrain);
      this.aiTrainTimer = 0;
    }
    
    // Update obstacles
    this.obstacles.forEach(obstacle => obstacle.update(deltaTime));
    this.obstacles = this.obstacles.filter(obstacle => !obstacle.markedForDeletion);
    
    // Update coal
    this.coals.forEach(coal => coal.update(deltaTime));
    this.coals = this.coals.filter(coal => !coal.markedForDeletion);
    
    // Update power-ups
    this.powerUps.forEach(powerUp => powerUp.update(deltaTime));
    this.powerUps = this.powerUps.filter(powerUp => !powerUp.markedForDeletion);
    
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
    
    // Spawn power-ups
    this.powerUpTimer += deltaTime;
    if (this.powerUpTimer > 8000) {
      this.powerUps.push(new PowerUp(this));
      this.powerUpTimer = 0;
    }
    
    // Check collisions
    this.checkCollisions();
    
    // Update leaderboard
    this.leaderboard.update();
    
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
      this.onUIUpdate(this.score, this.train.fuel, this.train.speed, this.leaderboard.getPlayerPosition());
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
        if (this.train.hasShield()) {
          obstacle.markedForDeletion = true;
          this.score += 200; // Bonus for shield destruction
        } else if (this.train.speed > 30) {
          this.train.crashed = true;
        } else {
          this.train.speed = Math.max(0, this.train.speed - 20);
          obstacle.markedForDeletion = true;
          this.score += 50; // Bonus for careful navigation
        }
      }
      
      // AI train collisions
      this.aiTrains.forEach(aiTrain => {
        if (aiTrain.collidesWith(obstacle)) {
          if (aiTrain.speed > 25) {
            aiTrain.speed = Math.max(5, aiTrain.speed - 30);
          } else {
            aiTrain.speed = Math.max(0, aiTrain.speed - 15);
          }
          obstacle.markedForDeletion = true;
        }
      });
    });
    
    // Check coal collisions
    this.coals.forEach(coal => {
      if (this.train.collidesWith(coal)) {
        this.train.fuel = Math.min(100, this.train.fuel + 25);
        coal.markedForDeletion = true;
        this.score += 100;
      }
      
      // AI train coal collection
      this.aiTrains.forEach(aiTrain => {
        if (aiTrain.collidesWith(coal)) {
          aiTrain.fuel = Math.min(100, aiTrain.fuel + 20);
          coal.markedForDeletion = true;
        }
      });
    });
    
    // Check power-up collisions
    this.powerUps.forEach(powerUp => {
      if (this.train.collidesWith(powerUp)) {
        powerUp.apply(this.train);
        powerUp.markedForDeletion = true;
        this.score += 150;
      }
    });
  }
  
  gameOver() {
    this.gameState = 'gameOver';
    if (this.onGameOver) {
      this.onGameOver(this.score, this.leaderboard.getPlayerPosition(), this.leaderboard.getTotalTrains());
    }
  }
  
  draw() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    
    // Draw background
    this.background.draw(this.ctx);
    
    // Draw weather
    this.weather.draw(this.ctx);
    
    if (this.gameState === 'playing') {
      // Draw obstacles
      this.obstacles.forEach(obstacle => obstacle.draw(this.ctx));
      
      // Draw coal
      this.coals.forEach(coal => coal.draw(this.ctx));
      
      // Draw power-ups
      this.powerUps.forEach(powerUp => powerUp.draw(this.ctx));
      
      // Draw AI trains
      this.aiTrains.forEach(aiTrain => aiTrain.draw(this.ctx));
      
      // Draw player train
      this.train.draw(this.ctx);
      
      // Draw leaderboard
      this.leaderboard.draw(this.ctx);
      
      // Draw weather indicator
      this.drawWeatherIndicator();
    }
  }
  
  drawWeatherIndicator() {
    const x = 20;
    const y = this.height - 40;
    
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    this.ctx.fillRect(x, y, 150, 25);
    
    this.ctx.fillStyle = '#FFFFFF';
    this.ctx.font = '14px Arial';
    this.ctx.textAlign = 'left';
    
    let weatherText = '';
    switch (this.weather.type) {
      case 'clear': weatherText = '☀️ Clear'; break;
      case 'rain': weatherText = '🌧️ Rain'; break;
      case 'snow': weatherText = '❄️ Snow'; break;
      case 'fog': weatherText = '🌫️ Fog'; break;
    }
    
    this.ctx.fillText(`Weather: ${weatherText}`, x + 5, y + 17);
  }
  
  gameLoop(timeStamp) {
    const deltaTime = timeStamp - this.lastTime;
    this.lastTime = timeStamp;
    
    this.update(deltaTime);
    this.draw();
    
    requestAnimationFrame(this.gameLoop.bind(this));
  }
}