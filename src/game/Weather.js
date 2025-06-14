export class Weather {
  constructor(game) {
    this.game = game;
    this.type = 'clear'; // clear, rain, snow, fog
    this.intensity = 0;
    this.particles = [];
    this.changeTimer = 0;
    this.duration = 10000 + Math.random() * 15000;
  }
  
  update(deltaTime) {
    this.changeTimer += deltaTime;
    
    if (this.changeTimer > this.duration) {
      this.changeWeather();
      this.changeTimer = 0;
      this.duration = 10000 + Math.random() * 15000;
    }
    
    // Update weather particles
    if (this.type === 'rain') {
      this.updateRain();
    } else if (this.type === 'snow') {
      this.updateSnow();
    }
    
    // Update existing particles
    this.particles.forEach(particle => {
      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.life -= particle.decay;
    });
    
    this.particles = this.particles.filter(particle => 
      particle.life > 0 && particle.y < this.game.height
    );
  }
  
  changeWeather() {
    const types = ['clear', 'rain', 'snow', 'fog'];
    this.type = types[Math.floor(Math.random() * types.length)];
    this.intensity = 0.3 + Math.random() * 0.7;
  }
  
  updateRain() {
    for (let i = 0; i < this.intensity * 15; i++) {
      this.particles.push({
        x: Math.random() * (this.game.width + 100) - 50,
        y: -10,
        vx: -2 - Math.random() * 3,
        vy: 8 + Math.random() * 4,
        life: 1,
        decay: 0.01,
        size: 1 + Math.random(),
        type: 'rain'
      });
    }
  }
  
  updateSnow() {
    for (let i = 0; i < this.intensity * 8; i++) {
      this.particles.push({
        x: Math.random() * (this.game.width + 100) - 50,
        y: -10,
        vx: -0.5 + Math.random(),
        vy: 2 + Math.random() * 2,
        life: 1,
        decay: 0.005,
        size: 2 + Math.random() * 3,
        type: 'snow'
      });
    }
  }
  
  draw(ctx) {
    if (this.type === 'fog') {
      // Draw fog overlay
      ctx.save();
      ctx.globalAlpha = this.intensity * 0.3;
      ctx.fillStyle = '#CCCCCC';
      ctx.fillRect(0, 0, this.game.width, this.game.height);
      ctx.restore();
    }
    
    // Draw weather particles
    this.particles.forEach(particle => {
      ctx.save();
      ctx.globalAlpha = particle.life;
      
      if (particle.type === 'rain') {
        ctx.strokeStyle = '#4A90E2';
        ctx.lineWidth = particle.size;
        ctx.beginPath();
        ctx.moveTo(particle.x, particle.y);
        ctx.lineTo(particle.x + particle.vx * 3, particle.y + particle.vy * 3);
        ctx.stroke();
      } else if (particle.type === 'snow') {
        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
      }
      
      ctx.restore();
    });
  }
  
  getSpeedModifier() {
    switch (this.type) {
      case 'rain': return 0.9;
      case 'snow': return 0.8;
      case 'fog': return 0.95;
      default: return 1.0;
    }
  }
  
  getVisibilityModifier() {
    switch (this.type) {
      case 'fog': return 0.7;
      case 'rain': return 0.9;
      case 'snow': return 0.85;
      default: return 1.0;
    }
  }
}