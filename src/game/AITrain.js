export class AITrain {
  constructor(game, lane = 1, color = '#8B0000') {
    this.game = game;
    this.width = 100;
    this.height = 50;
    this.x = -this.width;
    this.y = game.height - this.height - 100 - (lane * 60);
    this.lane = lane;
    this.color = color;
    
    this.speed = 15 + Math.random() * 25;
    this.maxSpeed = 60;
    this.fuel = 80 + Math.random() * 20;
    this.personality = Math.random(); // 0 = cautious, 1 = aggressive
    
    this.smokeParticles = [];
    this.markedForDeletion = false;
    this.position = 0; // Track position for racing
    this.name = this.generateName();
  }
  
  generateName() {
    const names = [
      'Lightning Express', 'Iron Thunder', 'Steam Phantom', 'Copper Bullet',
      'Golden Arrow', 'Silver Streak', 'Midnight Runner', 'Storm Chaser',
      'Fire Dragon', 'Wind Walker', 'Steel Phoenix', 'Crimson Comet'
    ];
    return names[Math.floor(Math.random() * names.length)];
  }
  
  update(deltaTime) {
    // AI decision making
    this.makeDecisions();
    
    // Update position
    this.x += this.speed * 0.5;
    this.position += this.speed * 0.01;
    
    // Consume fuel
    if (this.speed > 0) {
      this.fuel -= 0.01 * (this.speed / 20);
    }
    
    // Generate smoke
    if (this.speed > 10) {
      this.smokeParticles.push({
        x: this.x - 10,
        y: this.y + 5,
        vx: -1 - Math.random(),
        vy: -0.5 - Math.random() * 0.5,
        life: 1,
        size: 3 + Math.random() * 6
      });
    }
    
    // Update smoke particles
    this.smokeParticles.forEach(particle => {
      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.life -= 0.03;
      particle.size *= 1.01;
    });
    
    this.smokeParticles = this.smokeParticles.filter(particle => particle.life > 0);
    
    // Remove if off screen
    if (this.x > this.game.width + 100) {
      this.markedForDeletion = true;
    }
    
    // Slow down if low fuel
    if (this.fuel < 20) {
      this.speed = Math.max(5, this.speed - 0.1);
    }
  }
  
  makeDecisions() {
    // Check for obstacles ahead
    const obstaclesAhead = this.game.obstacles.filter(obstacle => 
      obstacle.x > this.x && obstacle.x < this.x + 200 &&
      Math.abs(obstacle.y - this.y) < 50
    );
    
    // Check for coal ahead
    const coalAhead = this.game.coals.filter(coal =>
      coal.x > this.x && coal.x < this.x + 150 &&
      Math.abs(coal.y - this.y) < 40
    );
    
    if (obstaclesAhead.length > 0) {
      // Personality-based reaction to obstacles
      if (this.personality < 0.3) {
        // Cautious: slow down early
        this.speed = Math.max(10, this.speed - 0.5);
      } else if (this.personality > 0.7) {
        // Aggressive: maintain speed longer
        if (obstaclesAhead[0].x - this.x < 80) {
          this.speed = Math.max(5, this.speed - 0.8);
        }
      } else {
        // Balanced approach
        if (obstaclesAhead[0].x - this.x < 120) {
          this.speed = Math.max(8, this.speed - 0.3);
        }
      }
    } else {
      // No obstacles, speed up if fuel allows
      if (this.fuel > 30 && this.speed < this.maxSpeed) {
        this.speed = Math.min(this.maxSpeed, this.speed + 0.2);
      }
    }
    
    // Try to collect coal
    if (coalAhead.length > 0 && this.fuel < 70) {
      // Adjust slightly towards coal
      const coal = coalAhead[0];
      if (coal.y < this.y) {
        this.y = Math.max(this.game.height - this.height - 160, this.y - 1);
      } else if (coal.y > this.y) {
        this.y = Math.min(this.game.height - this.height - 100, this.y + 1);
      }
    }
  }
  
  draw(ctx) {
    // Draw smoke
    this.smokeParticles.forEach(particle => {
      ctx.save();
      ctx.globalAlpha = particle.life * 0.4;
      ctx.fillStyle = '#555';
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });
    
    // Draw train body
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    
    // Draw train front
    const frontColor = this.adjustColor(this.color, -20);
    ctx.fillStyle = frontColor;
    ctx.fillRect(this.x + this.width - 15, this.y - 8, 15, this.height + 16);
    
    // Draw windows
    ctx.fillStyle = '#87CEEB';
    ctx.fillRect(this.x + 8, this.y + 8, 12, 12);
    ctx.fillRect(this.x + 28, this.y + 8, 12, 12);
    ctx.fillRect(this.x + 48, this.y + 8, 12, 12);
    
    // Draw wheels
    ctx.fillStyle = '#1C1C1C';
    ctx.beginPath();
    ctx.arc(this.x + 15, this.y + this.height, 12, 0, Math.PI * 2);
    ctx.arc(this.x + 40, this.y + this.height, 12, 0, Math.PI * 2);
    ctx.arc(this.x + 65, this.y + this.height, 12, 0, Math.PI * 2);
    ctx.fill();
    
    // Draw chimney
    ctx.fillStyle = '#654321';
    ctx.fillRect(this.x + 70, this.y - 15, 8, 15);
    
    // Draw name tag
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(this.x, this.y - 25, this.width, 15);
    ctx.fillStyle = '#FFD700';
    ctx.font = '10px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(this.name, this.x + this.width/2, this.y - 15);
    
    // Draw fuel indicator
    const fuelWidth = (this.fuel / 100) * (this.width - 10);
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fillRect(this.x + 5, this.y + this.height + 5, this.width - 10, 4);
    ctx.fillStyle = this.fuel > 30 ? '#00FF00' : this.fuel > 15 ? '#FFFF00' : '#FF0000';
    ctx.fillRect(this.x + 5, this.y + this.height + 5, fuelWidth, 4);
  }
  
  adjustColor(color, amount) {
    const hex = color.replace('#', '');
    const r = Math.max(0, Math.min(255, parseInt(hex.substr(0, 2), 16) + amount));
    const g = Math.max(0, Math.min(255, parseInt(hex.substr(2, 2), 16) + amount));
    const b = Math.max(0, Math.min(255, parseInt(hex.substr(4, 2), 16) + amount));
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  }
  
  collidesWith(object) {
    return this.x < object.x + object.width &&
           this.x + this.width > object.x &&
           this.y < object.y + object.height &&
           this.y + this.height > object.y;
  }
}