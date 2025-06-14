export class PowerUp {
  constructor(game) {
    this.game = game;
    this.width = 30;
    this.height = 30;
    this.x = game.width;
    this.y = game.height - this.height - 120 - Math.random() * 100;
    this.speed = game.gameSpeed;
    this.markedForDeletion = false;
    
    this.types = ['speed', 'fuel', 'shield', 'magnet', 'health', 'invincibility', 'turbo', 'multishot'];
    this.type = this.types[Math.floor(Math.random() * this.types.length)];
    
    this.bobOffset = Math.random() * Math.PI * 2;
    this.glowIntensity = 0;
    this.particles = [];
    this.rotationAngle = 0;
  }
  
  update(deltaTime) {
    this.x -= this.speed;
    
    // Add bobbing motion
    this.y += Math.sin(Date.now() * 0.008 + this.bobOffset) * 0.4;
    
    // Update rotation
    this.rotationAngle += 0.05;
    
    // Update glow
    this.glowIntensity = (Math.sin(Date.now() * 0.01) + 1) * 0.5;
    
    // Add enhanced particles
    if (Math.random() < 0.6) {
      this.particles.push({
        x: this.x + this.width/2 + (Math.random() - 0.5) * this.width * 1.5,
        y: this.y + this.height/2 + (Math.random() - 0.5) * this.height * 1.5,
        vx: (Math.random() - 0.5) * 3,
        vy: (Math.random() - 0.5) * 3,
        life: 1,
        size: 2 + Math.random() * 4,
        color: this.getColor()
      });
    }
    
    // Update particles
    this.particles.forEach(particle => {
      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.life -= 0.02;
      particle.size *= 1.01;
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
      ctx.fillStyle = particle.color;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });
    
    // Draw multiple glow layers
    for (let i = 3; i >= 1; i--) {
      ctx.save();
      ctx.globalAlpha = this.glowIntensity * 0.2 * i;
      ctx.fillStyle = this.getColor();
      ctx.beginPath();
      ctx.arc(this.x + this.width/2, this.y + this.height/2, this.width/2 + (i * 8), 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
    
    // Draw rotating power-up with gradient
    ctx.save();
    ctx.translate(this.x + this.width/2, this.y + this.height/2);
    ctx.rotate(this.rotationAngle);
    
    const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, this.width/2);
    gradient.addColorStop(0, this.getColor());
    gradient.addColorStop(0.7, this.adjustColor(this.getColor(), -30));
    gradient.addColorStop(1, this.adjustColor(this.getColor(), -60));
    
    ctx.fillStyle = gradient;
    ctx.fillRect(-this.width/2, -this.height/2, this.width, this.height);
    
    // Draw border
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 2;
    ctx.strokeRect(-this.width/2, -this.height/2, this.width, this.height);
    
    ctx.restore();
    
    // Draw icon with shadow
    ctx.save();
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.font = 'bold 18px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(this.getIcon(), this.x + this.width/2 + 1, this.y + this.height/2 + 7);
    
    ctx.fillStyle = '#FFFFFF';
    ctx.fillText(this.getIcon(), this.x + this.width/2, this.y + this.height/2 + 6);
    ctx.restore();
    
    // Draw type label
    ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
    ctx.fillRect(this.x - 10, this.y + this.height + 5, this.width + 20, 12);
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '10px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(this.getTypeName(), this.x + this.width/2, this.y + this.height + 14);
  }
  
  getColor() {
    switch (this.type) {
      case 'speed': return '#FF4444';
      case 'fuel': return '#44FF44';
      case 'shield': return '#4444FF';
      case 'magnet': return '#FFAA00';
      case 'health': return '#FF69B4';
      case 'invincibility': return '#FFD700';
      case 'turbo': return '#FF6600';
      case 'multishot': return '#9932CC';
      default: return '#FFFFFF';
    }
  }
  
  getIcon() {
    switch (this.type) {
      case 'speed': return '⚡';
      case 'fuel': return '⛽';
      case 'shield': return '🛡';
      case 'magnet': return '🧲';
      case 'health': return '❤️';
      case 'invincibility': return '⭐';
      case 'turbo': return '🔥';
      case 'multishot': return '💫';
      default: return '?';
    }
  }
  
  getTypeName() {
    switch (this.type) {
      case 'speed': return 'SPEED';
      case 'fuel': return 'FUEL';
      case 'shield': return 'SHIELD';
      case 'magnet': return 'MAGNET';
      case 'health': return 'HEALTH';
      case 'invincibility': return 'STAR';
      case 'turbo': return 'TURBO';
      case 'multishot': return 'MULTI';
      default: return 'UNKNOWN';
    }
  }
  
  adjustColor(color, amount) {
    const hex = color.replace('#', '');
    const r = Math.max(0, Math.min(255, parseInt(hex.substr(0, 2), 16) + amount));
    const g = Math.max(0, Math.min(255, parseInt(hex.substr(2, 2), 16) + amount));
    const b = Math.max(0, Math.min(255, parseInt(hex.substr(4, 2), 16) + amount));
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  }
  
  apply(train) {
    switch (this.type) {
      case 'speed':
        train.maxSpeed = Math.min(150, train.maxSpeed + 25);
        train.speedBoostTimer = 8000;
        break;
      case 'fuel':
        train.fuel = Math.min(100, train.fuel + 50);
        break;
      case 'shield':
        train.shieldTimer = 12000;
        break;
      case 'magnet':
        train.magnetTimer = 10000;
        break;
      case 'health':
        train.health = Math.min(100, train.health + 30);
        break;
      case 'invincibility':
        train.invincibilityTimer = 5000;
        break;
      case 'turbo':
        train.turboTimer = 3000;
        train.maxSpeed = Math.min(200, train.maxSpeed + 40);
        break;
      case 'multishot':
        train.experience += 50;
        break;
    }
  }
}