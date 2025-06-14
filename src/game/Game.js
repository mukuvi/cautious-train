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
    this.maxGameSpeed = 12;
    this.difficulty = 1;
    this.combo = 0;
    this.maxCombo = 0;
    
    this.train = new Train(this);
    this.aiTrains = [];
    this.background = new Background(this);
    this.inputHandler = new InputHandler(this);
    this.weather = new Weather(this);
    this.leaderboard = new Leaderboard(this);
    
    this.obstacles = [];
    this.coals = [];
    this.powerUps = [];
    this.explosions = [];
    this.achievements = [];
    
    this.obstacleTimer = 0;
    this.coalTimer = 0;
    this.powerUpTimer = 0;
    this.aiTrainTimer = 0;
    this.scoreTimer = 0;
    this.difficultyTimer = 0;
    this.comboTimer = 0;
    
    this.onGameOver = null;
    this.onUIUpdate = null;
    
    this.lastTime = 0;
    
    this.initializeAITrains();
    this.initializeAchievements();
  }
  
  initializeAITrains() {
    const colors = ['#8B0000', '#006400', '#4B0082', '#FF8C00', '#8B4513', '#2F4F4F', '#DC143C', '#4169E1'];
    for (let i = 0; i < 7; i++) {
      const aiTrain = new AITrain(this, i % 4, colors[i]);
      this.aiTrains.push(aiTrain);
      this.leaderboard.addTrain(aiTrain);
    }
    this.leaderboard.addTrain(this.train, true);
  }
  
  initializeAchievements() {
    this.achievements = [
      { id: 'speed_demon', name: 'Speed Demon', description: 'Reach 100 mph', unlocked: false },
      { id: 'fuel_master', name: 'Fuel Master', description: 'Collect 50 coal pieces', unlocked: false },
      { id: 'survivor', name: 'Survivor', description: 'Survive for 5 minutes', unlocked: false },
      { id: 'combo_king', name: 'Combo King', description: 'Achieve 10x combo', unlocked: false },
      { id: 'level_up', name: 'Level Up', description: 'Reach level 5', unlocked: false }
    ];
  }
  
  init() {
    this.gameLoop(0);
  }
  
  start() {
    this.gameState = 'playing';
    this.score = 0;
    this.gameSpeed = 2;
    this.difficulty = 1;
    this.combo = 0;
    this.maxCombo = 0;
    this.train.reset();
    this.obstacles = [];
    this.coals = [];
    this.powerUps = [];
    this.explosions = [];
    this.obstacleTimer = 0;
    this.coalTimer = 0;
    this.powerUpTimer = 0;
    this.aiTrainTimer = 0;
    this.scoreTimer = 0;
    this.difficultyTimer = 0;
    this.comboTimer = 0;
    
    // Reset AI trains
    this.aiTrains.forEach(aiTrain => {
      aiTrain.x = -aiTrain.width - Math.random() * 300;
      aiTrain.speed = 15 + Math.random() * 30;
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
    if (this.aiTrainTimer > 6000 && this.aiTrains.length < 7) {
      const colors = ['#8B0000', '#006400', '#4B0082', '#FF8C00', '#8B4513', '#2F4F4F', '#DC143C', '#4169E1'];
      const aiTrain = new AITrain(this, Math.floor(Math.random() * 4), colors[Math.floor(Math.random() * colors.length)]);
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
    
    // Update explosions
    this.explosions.forEach(explosion => explosion.update(deltaTime));
    this.explosions = this.explosions.filter(explosion => !explosion.markedForDeletion);
    
    // Spawn obstacles
    this.obstacleTimer += deltaTime;
    const obstacleSpawnRate = Math.max(800, 2000 - this.difficulty * 200);
    if (this.obstacleTimer > obstacleSpawnRate) {
      this.obstacles.push(new Obstacle(this));
      this.obstacleTimer = 0;
    }
    
    // Spawn coal
    this.coalTimer += deltaTime;
    if (this.coalTimer > Math.max(2000, 4000 - this.difficulty * 300)) {
      this.coals.push(new Coal(this));
      this.coalTimer = 0;
    }
    
    // Spawn power-ups
    this.powerUpTimer += deltaTime;
    if (this.powerUpTimer > Math.max(5000, 10000 - this.difficulty * 500)) {
      this.powerUps.push(new PowerUp(this));
      this.powerUpTimer = 0;
    }
    
    // Check collisions
    this.checkCollisions();
    
    // Update leaderboard
    this.leaderboard.update();
    
    // Update score and combo
    this.scoreTimer += deltaTime;
    if (this.scoreTimer > 100) {
      const speedBonus = Math.floor(this.train.speed / 10);
      const comboBonus = this.combo > 0 ? this.combo * 2 : 0;
      this.score += speedBonus + comboBonus;
      this.scoreTimer = 0;
    }
    
    // Update combo timer
    this.comboTimer += deltaTime;
    if (this.comboTimer > 3000 && this.combo > 0) {
      this.combo = 0;
      this.comboTimer = 0;
    }
    
    // Increase difficulty
    this.difficultyTimer += deltaTime;
    if (this.difficultyTimer > 30000) {
      this.difficulty++;
      this.difficultyTimer = 0;
    }
    
    // Increase game speed gradually
    if (this.gameSpeed < this.maxGameSpeed) {
      this.gameSpeed += 0.002;
    }
    
    // Check achievements
    this.checkAchievements();
    
    // Update UI
    if (this.onUIUpdate) {
      this.onUIUpdate(
        this.score, 
        this.train.fuel, 
        this.train.speed, 
        this.leaderboard.getPlayerPosition(),
        this.train.health,
        this.train.level,
        this.combo,
        this.difficulty
      );
    }
    
    // Check game over conditions
    if (this.train.fuel <= 0 || this.train.crashed || this.train.health <= 0) {
      this.gameOver();
    }
  }
  
  checkCollisions() {
    // Check obstacle collisions
    this.obstacles.forEach(obstacle => {
      if (this.train.collidesWith(obstacle)) {
        if (this.train.hasShield() || this.train.isInvincible()) {
          this.createExplosion(obstacle.x, obstacle.y);
          obstacle.markedForDeletion = true;
          this.score += 300;
          this.combo++;
          this.comboTimer = 0;
        } else if (this.train.speed > 40) {
          this.train.health -= 30;
          this.train.speed = Math.max(0, this.train.speed - 30);
          this.createExplosion(this.train.x, this.train.y);
          obstacle.markedForDeletion = true;
          this.combo = 0;
          if (this.train.health <= 0) {
            this.train.crashed = true;
          }
        } else {
          this.train.speed = Math.max(0, this.train.speed - 15);
          this.train.health -= 10;
          obstacle.markedForDeletion = true;
          this.score += 75;
          this.combo++;
          this.comboTimer = 0;
        }
        
        if (this.combo > this.maxCombo) {
          this.maxCombo = this.combo;
        }
      }
      
      // AI train collisions
      this.aiTrains.forEach(aiTrain => {
        if (aiTrain.collidesWith(obstacle)) {
          if (aiTrain.speed > 30) {
            aiTrain.speed = Math.max(5, aiTrain.speed - 35);
          } else {
            aiTrain.speed = Math.max(0, aiTrain.speed - 20);
          }
          obstacle.markedForDeletion = true;
        }
      });
    });
    
    // Check coal collisions
    this.coals.forEach(coal => {
      if (this.train.collidesWith(coal)) {
        this.train.fuel = Math.min(100, this.train.fuel + 30);
        coal.markedForDeletion = true;
        this.score += 150;
        this.combo++;
        this.comboTimer = 0;
      }
      
      // AI train coal collection
      this.aiTrains.forEach(aiTrain => {
        if (aiTrain.collidesWith(coal)) {
          aiTrain.fuel = Math.min(100, aiTrain.fuel + 25);
          coal.markedForDeletion = true;
        }
      });
    });
    
    // Check power-up collisions
    this.powerUps.forEach(powerUp => {
      if (this.train.collidesWith(powerUp)) {
        powerUp.apply(this.train);
        powerUp.markedForDeletion = true;
        this.score += 200;
        this.combo++;
        this.comboTimer = 0;
        this.createPowerUpEffect(powerUp.x, powerUp.y, powerUp.getColor());
      }
    });
  }
  
  createExplosion(x, y) {
    this.explosions.push({
      x: x,
      y: y,
      particles: [],
      life: 1,
      markedForDeletion: false,
      update: function(deltaTime) {
        if (this.particles.length === 0) {
          for (let i = 0; i < 20; i++) {
            this.particles.push({
              x: this.x,
              y: this.y,
              vx: (Math.random() - 0.5) * 10,
              vy: (Math.random() - 0.5) * 10,
              life: 1,
              size: 3 + Math.random() * 8,
              color: Math.random() < 0.5 ? '#FF4500' : '#FFD700'
            });
          }
        }
        
        this.particles.forEach(particle => {
          particle.x += particle.vx;
          particle.y += particle.vy;
          particle.vy += 0.2;
          particle.life -= 0.05;
        });
        
        this.particles = this.particles.filter(p => p.life > 0);
        
        if (this.particles.length === 0) {
          this.markedForDeletion = true;
        }
      },
      draw: function(ctx) {
        this.particles.forEach(particle => {
          ctx.save();
          ctx.globalAlpha = particle.life;
          ctx.fillStyle = particle.color;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        });
      }
    });
  }
  
  createPowerUpEffect(x, y, color) {
    this.explosions.push({
      x: x,
      y: y,
      particles: [],
      life: 1,
      markedForDeletion: false,
      update: function(deltaTime) {
        if (this.particles.length === 0) {
          for (let i = 0; i < 15; i++) {
            this.particles.push({
              x: this.x,
              y: this.y,
              vx: (Math.random() - 0.5) * 6,
              vy: (Math.random() - 0.5) * 6,
              life: 1,
              size: 2 + Math.random() * 5,
              color: color
            });
          }
        }
        
        this.particles.forEach(particle => {
          particle.x += particle.vx;
          particle.y += particle.vy;
          particle.life -= 0.03;
        });
        
        this.particles = this.particles.filter(p => p.life > 0);
        
        if (this.particles.length === 0) {
          this.markedForDeletion = true;
        }
      },
      draw: function(ctx) {
        this.particles.forEach(particle => {
          ctx.save();
          ctx.globalAlpha = particle.life;
          ctx.fillStyle = particle.color;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        });
      }
    });
  }
  
  checkAchievements() {
    this.achievements.forEach(achievement => {
      if (achievement.unlocked) return;
      
      switch (achievement.id) {
        case 'speed_demon':
          if (this.train.speed >= 100) {
            achievement.unlocked = true;
            this.showAchievement(achievement);
          }
          break;
        case 'fuel_master':
          // This would need a coal counter
          break;
        case 'survivor':
          // This would need a time counter
          break;
        case 'combo_king':
          if (this.combo >= 10) {
            achievement.unlocked = true;
            this.showAchievement(achievement);
          }
          break;
        case 'level_up':
          if (this.train.level >= 5) {
            achievement.unlocked = true;
            this.showAchievement(achievement);
          }
          break;
      }
    });
  }
  
  showAchievement(achievement) {
    // Achievement notification would be shown here
    console.log(`Achievement Unlocked: ${achievement.name} - ${achievement.description}`);
  }
  
  gameOver() {
    this.gameState = 'gameOver';
    if (this.onGameOver) {
      this.onGameOver(
        this.score, 
        this.leaderboard.getPlayerPosition(), 
        this.leaderboard.getTotalTrains(),
        this.train.level,
        this.maxCombo
      );
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
      
      // Draw explosions
      this.explosions.forEach(explosion => explosion.draw(this.ctx));
      
      // Draw AI trains
      this.aiTrains.forEach(aiTrain => aiTrain.draw(this.ctx));
      
      // Draw player train
      this.train.draw(this.ctx);
      
      // Draw leaderboard
      this.leaderboard.draw(this.ctx);
      
      // Draw weather indicator
      this.drawWeatherIndicator();
      
      // Draw combo indicator
      this.drawComboIndicator();
      
      // Draw difficulty indicator
      this.drawDifficultyIndicator();
    }
  }
  
  drawWeatherIndicator() {
    const x = 20;
    const y = this.height - 50;
    
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
    this.ctx.fillRect(x, y, 180, 30);
    
    this.ctx.fillStyle = '#FFFFFF';
    this.ctx.font = '14px Arial';
    this.ctx.textAlign = 'left';
    
    let weatherText = '';
    switch (this.weather.type) {
      case 'clear': weatherText = '☀️ Clear'; break;
      case 'rain': weatherText = '🌧️ Rain'; break;
      case 'snow': weatherText = '❄️ Snow'; break;
      case 'fog': weatherText = '🌫️ Fog'; break;
      case 'storm': weatherText = '⛈️ Storm'; break;
    }
    
    this.ctx.fillText(`Weather: ${weatherText}`, x + 5, y + 20);
  }
  
  drawComboIndicator() {
    if (this.combo > 0) {
      const x = this.width - 150;
      const y = 120;
      
      this.ctx.fillStyle = 'rgba(255, 215, 0, 0.9)';
      this.ctx.fillRect(x, y, 130, 40);
      
      this.ctx.fillStyle = '#000000';
      this.ctx.font = 'bold 18px Arial';
      this.ctx.textAlign = 'center';
      this.ctx.fillText(`COMBO x${this.combo}`, x + 65, y + 25);
    }
  }
  
  drawDifficultyIndicator() {
    const x = 220;
    const y = this.height - 50;
    
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
    this.ctx.fillRect(x, y, 120, 30);
    
    this.ctx.fillStyle = '#FF6B6B';
    this.ctx.font = '14px Arial';
    this.ctx.textAlign = 'left';
    this.ctx.fillText(`Difficulty: ${this.difficulty}`, x + 5, y + 20);
  }
  
  gameLoop(timeStamp) {
    const deltaTime = timeStamp - this.lastTime;
    this.lastTime = timeStamp;
    
    this.update(deltaTime);
    this.draw();
    
    requestAnimationFrame(this.gameLoop.bind(this));
  }
}