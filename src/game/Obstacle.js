export class Obstacle {
  constructor(game) {
    this.game = game;
    this.width = 50 + Math.random() * 80;
    this.height = 70 + Math.random() * 50;
    this.x = game.width;
    this.y = game.height - this.height - 100;
    this.speed = game.gameSpeed + Math.random() * 3;
    this.markedForDeletion = false;
    
    this.types = ['rock', 'tree', 'boulder', 'deadTree', 'metalBarrier', 'crystalFormation'];
    this.type = this.types[Math.floor(Math.random() * this.types.length)];
    
    this.animationOffset = Math.random() * Math.PI * 2;
    this.particles = [];
    this.health = this.getObstacleHealth();
  }
  
  getObstacleHealth() {
    switch (this.type) {
      case 'rock': return 1;
      case 'tree': return 1;
      case 'boulder': return 2;
      case 'deadTree': return 1;
      case 'metalBarrier': return 3;
      case 'crystalFormation': return 2;
      default: return 1;
    }
  }
  
  update(deltaTime) {
    this.x -= this.speed;
    
    // Add environmental particles
    if (Math.random() < 0.1) {
      this.particles.push({
        x: this.x + Math.random() * this.width,
        y: this.y + Math.random() * this.height,
        vx: (Math.random() - 0.5) * 2,
        vy: -Math.random() * 2,
        life: 1,
        size: 2 + Math.random() * 3,
        color: this.getParticleColor()
      });
    }
    
    // Update particles
    this.particles.forEach(particle => {
      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.life -= 0.02;
    });
    
    this.particles = this.particles.filter(particle => particle.life > 0);
    
    if (this.x + this.width < 0) {
      this.markedForDeletion = true;
    }
  }
  
  getParticleColor() {
    switch (this.type) {
      case 'rock': return '#A0A0A0';
      case 'tree': return '#228B22';
      case 'boulder': return '#696969';
      case 'deadTree': return '#8B4513';
      case 'metalBarrier': return '#C0C0C0';
      case 'crystalFormation': return '#9370DB';
      default: return '#FFFFFF';
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
    
    // Draw obstacle based on type
    switch (this.type) {
      case 'rock':
        this.drawRock(ctx);
        break;
      case 'tree':
        this.drawTree(ctx);
        break;
      case 'boulder':
        this.drawBoulder(ctx);
        break;
      case 'deadTree':
        this.drawDeadTree(ctx);
        break;
      case 'metalBarrier':
        this.drawMetalBarrier(ctx);
        break;
      case 'crystalFormation':
        this.drawCrystalFormation(ctx);
        break;
    }
    
    // Draw warning shadow
    ctx.fillStyle = 'rgba(255, 0, 0, 0.3)';
    ctx.fillRect(this.x - 15, this.y + this.height, this.width + 30, 12);
    
    // Draw health indicator for tough obstacles
    if (this.health > 1) {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
      ctx.fillRect(this.x, this.y - 15, this.width, 10);
      ctx.fillStyle = this.health > 2 ? '#FF0000' : '#FFA500';
      ctx.fillRect(this.x + 2, this.y - 13, (this.width - 4) * (this.health / this.getObstacleHealth()), 6);
    }
  }
  
  drawRock(ctx) {
    const gradient = ctx.createRadialGradient(
      this.x + this.width/2, this.y + this.height/2, 0,
      this.x + this.width/2, this.y + this.height/2, this.width/2
    );
    gradient.addColorStop(0, '#A0A0A0');
    gradient.addColorStop(1, '#696969');
    
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.ellipse(this.x + this.width/2, this.y + this.height/2, this.width/2, this.height/2, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Add texture
    ctx.fillStyle = '#808080';
    ctx.beginPath();
    ctx.ellipse(this.x + this.width/3, this.y + this.height/3, this.width/6, this.height/6, 0, 0, Math.PI * 2);
    ctx.fill();
  }
  
  drawTree(ctx) {
    // Trunk
    ctx.fillStyle = '#8B4513';
    ctx.fillRect(this.x + this.width/2 - 10, this.y + this.height/2, 20, this.height/2);
    
    // Foliage layers
    const layers = 3;
    for (let i = 0; i < layers; i++) {
      ctx.fillStyle = i === 0 ? '#228B22' : '#32CD32';
      ctx.beginPath();
      ctx.arc(
        this.x + this.width/2, 
        this.y + this.height/3 - i * 15, 
        this.width/2 - i * 5, 
        0, Math.PI * 2
      );
      ctx.fill();
    }
  }
  
  drawBoulder(ctx) {
    // Large irregular rock
    ctx.fillStyle = '#2F4F4F';
    ctx.beginPath();
    ctx.moveTo(this.x + this.width * 0.1, this.y + this.height * 0.8);
    ctx.lineTo(this.x + this.width * 0.3, this.y);
    ctx.lineTo(this.x + this.width * 0.7, this.y + this.height * 0.1);
    ctx.lineTo(this.x + this.width * 0.9, this.y + this.height * 0.6);
    ctx.lineTo(this.x + this.width * 0.6, this.y + this.height);
    ctx.lineTo(this.x + this.width * 0.2, this.y + this.height * 0.9);
    ctx.closePath();
    ctx.fill();
    
    // Highlights
    ctx.fillStyle = '#708090';
    ctx.beginPath();
    ctx.arc(this.x + this.width * 0.4, this.y + this.height * 0.3, this.width * 0.1, 0, Math.PI * 2);
    ctx.fill();
  }
  
  drawDeadTree(ctx) {
    // Dead trunk
    ctx.fillStyle = '#654321';
    ctx.fillRect(this.x + this.width/2 - 8, this.y + this.height/3, 16, this.height * 2/3);
    
    // Bare branches
    ctx.strokeStyle = '#8B4513';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(this.x + this.width/2, this.y + this.height/2);
    ctx.lineTo(this.x + this.width/2 - 20, this.y + this.height/3);
    ctx.moveTo(this.x + this.width/2, this.y + this.height/2);
    ctx.lineTo(this.x + this.width/2 + 15, this.y + this.height/4);
    ctx.stroke();
  }
  
  drawMetalBarrier(ctx) {
    // Metal base
    ctx.fillStyle = '#C0C0C0';
    ctx.fillRect(this.x, this.y + this.height * 0.7, this.width, this.height * 0.3);
    
    // Vertical bars
    for (let i = 0; i < 4; i++) {
      ctx.fillStyle = '#A9A9A9';
      ctx.fillRect(this.x + i * (this.width/4) + 5, this.y, 8, this.height * 0.8);
    }
    
    // Warning stripes
    ctx.fillStyle = '#FFD700';
    ctx.fillRect(this.x, this.y + this.height * 0.7, this.width, 5);
    ctx.fillStyle = '#FF0000';
    ctx.fillRect(this.x, this.y + this.height * 0.8, this.width, 5);
  }
  
  drawCrystalFormation(ctx) {
    // Crystal base
    ctx.fillStyle = '#9370DB';
    ctx.beginPath();
    ctx.moveTo(this.x + this.width/2, this.y);
    ctx.lineTo(this.x + this.width * 0.8, this.y + this.height * 0.6);
    ctx.lineTo(this.x + this.width * 0.6, this.y + this.height);
    ctx.lineTo(this.x + this.width * 0.4, this.y + this.height);
    ctx.lineTo(this.x + this.width * 0.2, this.y + this.height * 0.6);
    ctx.closePath();
    ctx.fill();
    
    // Crystal shine
    ctx.fillStyle = '#DDA0DD';
    ctx.beginPath();
    ctx.moveTo(this.x + this.width/2, this.y + 5);
    ctx.lineTo(this.x + this.width * 0.6, this.y + this.height * 0.3);
    ctx.lineTo(this.x + this.width * 0.4, this.y + this.height * 0.5);
    ctx.closePath();
    ctx.fill();
  }
}