export class Train {
  constructor(game) {
    this.game = game;
    this.width = 120;
    this.height = 60;
    this.x = 100;
    this.y = game.height - this.height - 100;
    
    this.speed = 0;
    this.maxSpeed = 80;
    this.acceleration = 0.3;
    this.deceleration = 0.2;
    this.fuel = 100;
    this.fuelConsumption = 0.02;
    
    this.crashed = false;
    this.smokeParticles = [];
  }
  
  reset() {
    this.speed = 0;
    this.fuel = 100;
    this.crashed = false;
    this.smokeParticles = [];
  }
  
  update(deltaTime) {
    if (this.crashed) return;
    
    // Handle input
    if (this.game.inputHandler.keys.includes('ArrowUp') && this.fuel > 0) {
      this.speed = Math.min(this.maxSpeed, this.speed + this.acceleration);
      this.fuel -= this.fuelConsumption * (this.speed / 10);
    }
    
    if (this.game.inputHandler.keys.includes('ArrowDown')) {
      this.speed = Math.max(0, this.speed - this.deceleration);
    }
    
    if (this.game.inputHandler.keys.includes(' ')) {
      this.speed = Math.max(0, this.speed - this.deceleration * 3);
    }
    
    // Natural deceleration
    if (!this.game.inputHandler.keys.includes('ArrowUp')) {
      this.speed = Math.max(0, this.speed - 0.1);
    }
    
    // Consume fuel based on speed
    if (this.speed > 0) {
      this.fuel -= this.fuelConsumption * (this.speed / 20);
    }
    
    // Update smoke particles
    if (this.speed > 10) {
      this.smokeParticles.push({
        x: this.x + this.width - 20,
        y: this.y + 10,
        vx: -2 - Math.random() * 2,
        vy: -1 - Math.random(),
        life: 1,
        size: 5 + Math.random() * 10
      });
    }
    
    this.smokeParticles.forEach(particle => {
      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.life -= 0.02;
      particle.size *= 1.02;
    });
    
    this.smokeParticles = this.smokeParticles.filter(particle => particle.life > 0);
  }
  
  draw(ctx) {
    // Draw smoke
    this.smokeParticles.forEach(particle => {
      ctx.save();
      ctx.globalAlpha = particle.life * 0.5;
      ctx.fillStyle = '#666';
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });
    
    // Draw train body
    ctx.fillStyle = this.crashed ? '#8B0000' : '#2C3E50';
    ctx.fillRect(this.x, this.y, this.width, this.height);
    
    // Draw train front
    ctx.fillStyle = this.crashed ? '#A52A2A' : '#34495E';
    ctx.fillRect(this.x + this.width - 20, this.y - 10, 20, this.height + 20);
    
    // Draw windows
    ctx.fillStyle = '#87CEEB';
    ctx.fillRect(this.x + 10, this.y + 10, 15, 15);
    ctx.fillRect(this.x + 35, this.y + 10, 15, 15);
    ctx.fillRect(this.x + 60, this.y + 10, 15, 15);
    
    // Draw wheels
    ctx.fillStyle = '#1C1C1C';
    ctx.beginPath();
    ctx.arc(this.x + 20, this.y + this.height, 15, 0, Math.PI * 2);
    ctx.arc(this.x + 50, this.y + this.height, 15, 0, Math.PI * 2);
    ctx.arc(this.x + 80, this.y + this.height, 15, 0, Math.PI * 2);
    ctx.fill();
    
    // Draw wheel spokes (rotating based on speed)
    const rotation = (Date.now() * this.speed * 0.01) % (Math.PI * 2);
    ctx.strokeStyle = '#666';
    ctx.lineWidth = 2;
    
    [20, 50, 80].forEach(offset => {
      ctx.save();
      ctx.translate(this.x + offset, this.y + this.height);
      ctx.rotate(rotation);
      ctx.beginPath();
      ctx.moveTo(-8, 0);
      ctx.lineTo(8, 0);
      ctx.moveTo(0, -8);
      ctx.lineTo(0, 8);
      ctx.stroke();
      ctx.restore();
    });
    
    // Draw chimney
    ctx.fillStyle = '#8B4513';
    ctx.fillRect(this.x + 85, this.y - 20, 10, 20);
    
    // Draw speed indicator
    if (this.speed > 50) {
      ctx.fillStyle = 'rgba(255, 0, 0, 0.3)';
      ctx.fillRect(this.x - 5, this.y - 5, this.width + 10, this.height + 10);
    }
  }
  
  collidesWith(object) {
    return this.x < object.x + object.width &&
           this.x + this.width > object.x &&
           this.y < object.y + object.height &&
           this.y + this.height > object.y;
  }
}