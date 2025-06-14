export class PowerUp {
  constructor(game) {
    this.game = game;
    this.width = 25;
    this.height = 25;
    this.x = game.width;
    this.y = game.height - this.height - 120 - Math.random() * 80;
    this.speed = game.gameSpeed;
    this.markedForDeletion = false;
    
    this.types = ['speed', 'fuel', 'shield', 'magnet'];
    this.type = this.types[Math.floor(Math.random() * this.types.length)];
    
    this.bobOffset = Math.random() * Math.PI * 2;
    this.glowIntensity = 0;
    this.particles = [];
  }
  
  update(deltaTime) {
    this.x -= this.speed;
    
    // Add bobbing motion
    this.y += Math.sin(Date.now() * 0.008 + this.bobOffset) * 0.3;
    
    // Update glow
    this.glowIntensity = (Math.sin(Date.now() * 0.01) + 1) * 0.5;
    
    // Add particles
    if (Math.random() < 0.4) {
      this.particles.push({
        x: this.x + this.width/2 + (Math.random() - 0.5) * this.width,
        y: this.y + this.height/2 + (Math.random() - 0.5) * this.height,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        life: 1,
        size: 2 + Math.random() * 3
      });
    }
    
    // Update particles
    this.particles.forEach(particle => {
      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.life -= 0.03;
    });
    
    this.particles = this.particles.filter(particle => particle.life > 0);
    
    if (this.x + this.width < 0) {
      this.markedForDeletion = true;
    }
  }
  
  draw(ctx) {
    // Draw particles
    this.particles.forEach(particle => {
      ctx.save();
      ctx.globalAlpha = particle.life;
      ctx.fillStyle = this.getColor();
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });
    
    // Draw glow effect
    ctx.save();
    ctx.globalAlpha = this.glowIntensity * 0.5;
    ctx.fillStyle = this.getColor();
    ctx.beginPath();
    ctx.arc(this.x + this.width/2, this.y + this.height/2, this.width/2 + 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
    
    // Draw power-up
    ctx.fillStyle = this.getColor();
    ctx.fillRect(this.x, this.y, this.width, this.height);
    
    // Draw icon
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 16px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(this.getIcon(), this.x + this.width/2, this.y + this.height/2 + 6);
  }
  
  getColor() {
    switch (this.type) {
      case 'speed': return '#FF4444';
      case 'fuel': return '#44FF44';
      case 'shield': return '#4444FF';
      case 'magnet': return '#FFAA00';
      default: return '#FFFFFF';
    }
  }
  
  getIcon() {
    switch (this.type) {
      case 'speed': return '⚡';
      case 'fuel': return '⛽';
      case 'shield': return '🛡';
      case 'magnet': return '🧲';
      default: return '?';
    }
  }
  
  apply(train) {
    switch (this.type) {
      case 'speed':
        train.maxSpeed = Math.min(120, train.maxSpeed + 20);
        train.speedBoostTimer = 5000;
        break;
      case 'fuel':
        train.fuel = Math.min(100, train.fuel + 40);
        break;
      case 'shield':
        train.shieldTimer = 8000;
        break;
      case 'magnet':
        train.magnetTimer = 6000;
        break;
    }
  }
}