export class Train {
  constructor(game) {
    this.game = game;
    this.width = 140;
    this.height = 70;
    this.x = 100;
    this.y = game.height - this.height - 100;
    
    this.speed = 0;
    this.maxSpeed = 80;
    this.acceleration = 0.3;
    this.deceleration = 0.2;
    this.fuel = 100;
    this.fuelConsumption = 0.02;
    this.health = 100;
    this.experience = 0;
    this.level = 1;
    
    this.crashed = false;
    this.smokeParticles = [];
    this.steamParticles = [];
    this.sparkParticles = [];
    
    // Power-up effects
    this.speedBoostTimer = 0;
    this.shieldTimer = 0;
    this.magnetTimer = 0;
    this.invincibilityTimer = 0;
    this.turboTimer = 0;
    this.originalMaxSpeed = this.maxSpeed;
    
    // Train customization
    this.trainColor = '#2C3E50';
    this.accentColor = '#E74C3C';
    this.wheelRotation = 0;
    
    // Special effects
    this.nitroFlames = [];
    this.electricSparks = [];
    this.achievements = [];
  }
  
  reset() {
    this.speed = 0;
    this.fuel = 100;
    this.health = 100;
    this.crashed = false;
    this.smokeParticles = [];
    this.steamParticles = [];
    this.sparkParticles = [];
    this.nitroFlames = [];
    this.electricSparks = [];
    this.speedBoostTimer = 0;
    this.shieldTimer = 0;
    this.magnetTimer = 0;
    this.invincibilityTimer = 0;
    this.turboTimer = 0;
    this.maxSpeed = this.originalMaxSpeed;
    this.wheelRotation = 0;
  }
  
  update(deltaTime) {
    if (this.crashed) return;
    
    // Update power-up timers
    if (this.speedBoostTimer > 0) {
      this.speedBoostTimer -= deltaTime;
      if (this.speedBoostTimer <= 0) {
        this.maxSpeed = this.originalMaxSpeed;
      }
    }
    
    if (this.shieldTimer > 0) {
      this.shieldTimer -= deltaTime;
    }
    
    if (this.invincibilityTimer > 0) {
      this.invincibilityTimer -= deltaTime;
    }
    
    if (this.turboTimer > 0) {
      this.turboTimer -= deltaTime;
      // Add turbo flames
      this.nitroFlames.push({
        x: this.x - 20,
        y: this.y + this.height/2 + (Math.random() - 0.5) * 20,
        vx: -8 - Math.random() * 4,
        vy: (Math.random() - 0.5) * 3,
        life: 1,
        size: 8 + Math.random() * 12,
        color: Math.random() < 0.5 ? '#FF4500' : '#FFD700'
      });
    }
    
    if (this.magnetTimer > 0) {
      this.magnetTimer -= deltaTime;
      // Attract nearby coal and power-ups
      [...this.game.coals, ...this.game.powerUps].forEach(item => {
        const dx = this.x + this.width/2 - (item.x + item.width/2);
        const dy = this.y + this.height/2 - (item.y + item.height/2);
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 150) {
          item.x += dx * 0.08;
          item.y += dy * 0.08;
        }
      });
    }
    
    // Apply weather effects
    const weatherModifier = this.game.weather.getSpeedModifier();
    
    // Handle input with enhanced controls
    if (this.game.inputHandler.keys.includes('ArrowUp') && this.fuel > 0) {
      this.speed = Math.min(this.maxSpeed * weatherModifier, this.speed + this.acceleration);
      this.fuel -= this.fuelConsumption * (this.speed / 10);
      
      // Add electric sparks at high speed
      if (this.speed > 60) {
        this.electricSparks.push({
          x: this.x + Math.random() * this.width,
          y: this.y + Math.random() * this.height,
          vx: (Math.random() - 0.5) * 6,
          vy: (Math.random() - 0.5) * 6,
          life: 1,
          size: 2 + Math.random() * 4
        });
      }
    }
    
    if (this.game.inputHandler.keys.includes('ArrowDown')) {
      this.speed = Math.max(0, this.speed - this.deceleration);
    }
    
    if (this.game.inputHandler.keys.includes(' ')) {
      this.speed = Math.max(0, this.speed - this.deceleration * 3);
      // Emergency brake sparks
      if (this.speed > 20) {
        for (let i = 0; i < 3; i++) {
          this.sparkParticles.push({
            x: this.x + 20 + i * 30,
            y: this.y + this.height + 10,
            vx: (Math.random() - 0.5) * 8,
            vy: -2 - Math.random() * 4,
            life: 1,
            size: 3 + Math.random() * 5
          });
        }
      }
    }
    
    // Turbo boost (Shift key)
    if (this.game.inputHandler.keys.includes('Shift') && this.fuel > 5) {
      this.turboTimer = 200;
      this.speed = Math.min(this.maxSpeed * 1.5, this.speed + this.acceleration * 2);
      this.fuel -= this.fuelConsumption * 3;
    }
    
    // Natural deceleration
    if (!this.game.inputHandler.keys.includes('ArrowUp')) {
      this.speed = Math.max(0, this.speed - 0.1);
    }
    
    // Update wheel rotation
    this.wheelRotation += this.speed * 0.1;
    
    // Consume fuel based on speed
    if (this.speed > 0) {
      this.fuel -= this.fuelConsumption * (this.speed / 20);
    }
    
    // Generate enhanced smoke and steam
    if (this.speed > 10) {
      // Main smoke
      this.smokeParticles.push({
        x: this.x + this.width - 30,
        y: this.y + 15,
        vx: -2 - Math.random() * 3,
        vy: -1 - Math.random() * 2,
        life: 1,
        size: 6 + Math.random() * 12,
        color: `rgba(${100 + Math.random() * 50}, ${100 + Math.random() * 50}, ${100 + Math.random() * 50}, 0.8)`
      });
      
      // Steam from chimney
      this.steamParticles.push({
        x: this.x + 100,
        y: this.y - 25,
        vx: -1 - Math.random(),
        vy: -3 - Math.random() * 2,
        life: 1,
        size: 4 + Math.random() * 8
      });
    }
    
    // Update all particle systems
    this.updateParticles();
    
    // Gain experience
    this.experience += this.speed * 0.01;
    if (this.experience >= this.level * 100) {
      this.levelUp();
    }
  }
  
  updateParticles() {
    // Update smoke
    this.smokeParticles.forEach(particle => {
      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.life -= 0.02;
      particle.size *= 1.02;
    });
    this.smokeParticles = this.smokeParticles.filter(p => p.life > 0);
    
    // Update steam
    this.steamParticles.forEach(particle => {
      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.life -= 0.03;
      particle.size *= 1.01;
    });
    this.steamParticles = this.steamParticles.filter(p => p.life > 0);
    
    // Update sparks
    this.sparkParticles.forEach(particle => {
      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.vy += 0.2; // gravity
      particle.life -= 0.05;
    });
    this.sparkParticles = this.sparkParticles.filter(p => p.life > 0);
    
    // Update nitro flames
    this.nitroFlames.forEach(particle => {
      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.life -= 0.08;
      particle.size *= 0.98;
    });
    this.nitroFlames = this.nitroFlames.filter(p => p.life > 0);
    
    // Update electric sparks
    this.electricSparks.forEach(particle => {
      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.life -= 0.1;
    });
    this.electricSparks = this.electricSparks.filter(p => p.life > 0);
  }
  
  levelUp() {
    this.level++;
    this.maxSpeed += 5;
    this.originalMaxSpeed += 5;
    this.health = 100;
    
    // Level up effect
    for (let i = 0; i < 20; i++) {
      this.sparkParticles.push({
        x: this.x + this.width/2,
        y: this.y + this.height/2,
        vx: (Math.random() - 0.5) * 10,
        vy: (Math.random() - 0.5) * 10,
        life: 1,
        size: 5 + Math.random() * 8
      });
    }
  }
  
  draw(ctx) {
    // Draw nitro flames
    this.nitroFlames.forEach(particle => {
      ctx.save();
      ctx.globalAlpha = particle.life;
      ctx.fillStyle = particle.color;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });
    
    // Draw shield effect
    if (this.shieldTimer > 0) {
      ctx.save();
      ctx.globalAlpha = 0.6;
      ctx.strokeStyle = '#00FFFF';
      ctx.lineWidth = 4;
      ctx.setLineDash([5, 5]);
      ctx.beginPath();
      ctx.arc(this.x + this.width/2, this.y + this.height/2, this.width/2 + 20, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
    }
    
    // Draw invincibility effect
    if (this.invincibilityTimer > 0) {
      ctx.save();
      ctx.globalAlpha = 0.5 + Math.sin(Date.now() * 0.02) * 0.3;
      ctx.fillStyle = '#FFD700';
      ctx.fillRect(this.x - 5, this.y - 5, this.width + 10, this.height + 10);
      ctx.restore();
    }
    
    // Draw magnet effect
    if (this.magnetTimer > 0) {
      ctx.save();
      ctx.globalAlpha = 0.3;
      ctx.strokeStyle = '#FFAA00';
      ctx.lineWidth = 3;
      ctx.setLineDash([10, 5]);
      ctx.beginPath();
      ctx.arc(this.x + this.width/2, this.y + this.height/2, 120, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
    }
    
    // Draw smoke
    this.smokeParticles.forEach(particle => {
      ctx.save();
      ctx.globalAlpha = particle.life * 0.6;
      ctx.fillStyle = particle.color || '#666';
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });
    
    // Draw steam
    this.steamParticles.forEach(particle => {
      ctx.save();
      ctx.globalAlpha = particle.life * 0.8;
      ctx.fillStyle = '#E6E6FA';
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });
    
    // Draw main train body with gradient
    const gradient = ctx.createLinearGradient(this.x, this.y, this.x, this.y + this.height);
    gradient.addColorStop(0, this.crashed ? '#8B0000' : this.trainColor);
    gradient.addColorStop(0.5, this.crashed ? '#A52A2A' : this.adjustColor(this.trainColor, 20));
    gradient.addColorStop(1, this.crashed ? '#654321' : this.adjustColor(this.trainColor, -20));
    
    if (this.speedBoostTimer > 0) {
      gradient.addColorStop(0, '#FF4444');
      gradient.addColorStop(1, '#FF6666');
    }
    
    ctx.fillStyle = gradient;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    
    // Draw detailed train front (locomotive nose)
    ctx.fillStyle = this.crashed ? '#A52A2A' : this.accentColor;
    ctx.fillRect(this.x + this.width - 25, this.y - 15, 25, this.height + 30);
    
    // Draw train front details
    ctx.fillStyle = '#FFD700';
    ctx.fillRect(this.x + this.width - 20, this.y + 10, 15, 8);
    ctx.fillRect(this.x + this.width - 20, this.y + this.height - 18, 15, 8);
    
    // Draw multiple windows with reflections
    const windowPositions = [15, 40, 65, 90];
    windowPositions.forEach(pos => {
      // Main window
      ctx.fillStyle = '#87CEEB';
      ctx.fillRect(this.x + pos, this.y + 12, 18, 18);
      
      // Window frame
      ctx.strokeStyle = '#2F4F4F';
      ctx.lineWidth = 2;
      ctx.strokeRect(this.x + pos, this.y + 12, 18, 18);
      
      // Window reflection
      ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
      ctx.fillRect(this.x + pos + 2, this.y + 14, 6, 14);
    });
    
    // Draw enhanced wheels with spokes
    const wheelPositions = [25, 55, 85, 115];
    ctx.fillStyle = '#1C1C1C';
    
    wheelPositions.forEach(pos => {
      // Main wheel
      ctx.beginPath();
      ctx.arc(this.x + pos, this.y + this.height, 18, 0, Math.PI * 2);
      ctx.fill();
      
      // Wheel rim
      ctx.strokeStyle = '#444';
      ctx.lineWidth = 3;
      ctx.stroke();
      
      // Animated spokes
      ctx.save();
      ctx.translate(this.x + pos, this.y + this.height);
      ctx.rotate(this.wheelRotation);
      ctx.strokeStyle = '#666';
      ctx.lineWidth = 2;
      
      for (let i = 0; i < 8; i++) {
        ctx.save();
        ctx.rotate((i * Math.PI) / 4);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(12, 0);
        ctx.stroke();
        ctx.restore();
      }
      ctx.restore();
    });
    
    // Draw detailed chimney with smoke stack
    ctx.fillStyle = '#8B4513';
    ctx.fillRect(this.x + 95, this.y - 30, 12, 30);
    
    // Chimney top
    ctx.fillStyle = '#654321';
    ctx.fillRect(this.x + 93, this.y - 35, 16, 8);
    
    // Draw boiler and steam dome
    ctx.fillStyle = '#C0C0C0';
    ctx.beginPath();
    ctx.arc(this.x + 70, this.y + 10, 8, 0, Math.PI * 2);
    ctx.fill();
    
    // Draw headlight
    ctx.fillStyle = this.speed > 0 ? '#FFFF99' : '#FFFFCC';
    ctx.beginPath();
    ctx.arc(this.x + this.width - 10, this.y + this.height/2, 6, 0, Math.PI * 2);
    ctx.fill();
    
    // Headlight beam
    if (this.speed > 0) {
      ctx.save();
      ctx.globalAlpha = 0.3;
      ctx.fillStyle = '#FFFF99';
      ctx.beginPath();
      ctx.moveTo(this.x + this.width - 4, this.y + this.height/2);
      ctx.lineTo(this.x + this.width + 100, this.y + this.height/2 - 30);
      ctx.lineTo(this.x + this.width + 100, this.y + this.height/2 + 30);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }
    
    // Draw sparks
    this.sparkParticles.forEach(particle => {
      ctx.save();
      ctx.globalAlpha = particle.life;
      ctx.fillStyle = '#FFD700';
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });
    
    // Draw electric sparks
    this.electricSparks.forEach(particle => {
      ctx.save();
      ctx.globalAlpha = particle.life;
      ctx.strokeStyle = '#00FFFF';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(particle.x, particle.y);
      ctx.lineTo(particle.x + particle.vx, particle.y + particle.vy);
      ctx.stroke();
      ctx.restore();
    });
    
    // Draw speed indicator
    if (this.speed > 50) {
      ctx.save();
      ctx.globalAlpha = 0.4;
      ctx.fillStyle = this.speed > 70 ? '#FF0000' : '#FFA500';
      ctx.fillRect(this.x - 8, this.y - 8, this.width + 16, this.height + 16);
      ctx.restore();
    }
    
    // Draw power-up indicators
    this.drawPowerUpIndicators(ctx);
    
    // Draw health bar
    this.drawHealthBar(ctx);
    
    // Draw level indicator
    this.drawLevelIndicator(ctx);
  }
  
  drawPowerUpIndicators(ctx) {
    let indicatorX = this.x;
    const indicatorY = this.y - 45;
    
    if (this.speedBoostTimer > 0) {
      ctx.fillStyle = 'rgba(255, 68, 68, 0.9)';
      ctx.fillRect(indicatorX, indicatorY, 25, 20);
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 14px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('⚡', indicatorX + 12, indicatorY + 14);
      indicatorX += 30;
    }
    
    if (this.shieldTimer > 0) {
      ctx.fillStyle = 'rgba(68, 68, 255, 0.9)';
      ctx.fillRect(indicatorX, indicatorY, 25, 20);
      ctx.fillStyle = '#FFFFFF';
      ctx.fillText('🛡', indicatorX + 12, indicatorY + 14);
      indicatorX += 30;
    }
    
    if (this.magnetTimer > 0) {
      ctx.fillStyle = 'rgba(255, 170, 0, 0.9)';
      ctx.fillRect(indicatorX, indicatorY, 25, 20);
      ctx.fillStyle = '#FFFFFF';
      ctx.fillText('🧲', indicatorX + 12, indicatorY + 14);
      indicatorX += 30;
    }
    
    if (this.invincibilityTimer > 0) {
      ctx.fillStyle = 'rgba(255, 215, 0, 0.9)';
      ctx.fillRect(indicatorX, indicatorY, 25, 20);
      ctx.fillStyle = '#FFFFFF';
      ctx.fillText('⭐', indicatorX + 12, indicatorY + 14);
    }
  }
  
  drawHealthBar(ctx) {
    const barWidth = this.width;
    const barHeight = 6;
    const barX = this.x;
    const barY = this.y + this.height + 8;
    
    // Background
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fillRect(barX, barY, barWidth, barHeight);
    
    // Health bar
    const healthWidth = (this.health / 100) * barWidth;
    ctx.fillStyle = this.health > 60 ? '#00FF00' : this.health > 30 ? '#FFFF00' : '#FF0000';
    ctx.fillRect(barX, barY, healthWidth, barHeight);
  }
  
  drawLevelIndicator(ctx) {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
    ctx.fillRect(this.x, this.y - 65, 60, 15);
    ctx.fillStyle = '#FFD700';
    ctx.font = 'bold 12px Arial';
    ctx.textAlign = 'left';
    ctx.fillText(`LVL ${this.level}`, this.x + 5, this.y - 55);
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
  
  hasShield() {
    return this.shieldTimer > 0;
  }
  
  isInvincible() {
    return this.invincibilityTimer > 0;
  }
}