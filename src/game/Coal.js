export class Coal {
  constructor(game) {
    this.game = game;
    this.width = 30;
    this.height = 30;
    this.x = game.width;
    this.y = game.height - this.height - 120 - Math.random() * 50;
    this.speed = game.gameSpeed;
    this.markedForDeletion = false;
    this.bobOffset = Math.random() * Math.PI * 2;
    this.sparkles = [];
  }
  
  update(deltaTime) {
    this.x -= this.speed;
    
    // Add bobbing motion
    this.y += Math.sin(Date.now() * 0.005 + this.bobOffset) * 0.5;
    
    // Add sparkle effects
    if (Math.random() < 0.3) {
      this.sparkles.push({
        x: this.x + Math.random() * this.width,
        y: this.y + Math.random() * this.height,
        life: 1,
        size: 2 + Math.random() * 3
      });
    }
    
    // Update sparkles
    this.sparkles.forEach(sparkle => {
      sparkle.life -= 0.05;
      sparkle.y -= 1;
    });
    
    this.sparkles = this.sparkles.filter(sparkle => sparkle.life > 0);
    
    if (this.x + this.width < 0) {
      this.markedForDeletion = true;
    }
  }
  
  draw(ctx) {
    // Draw sparkles
    this.sparkles.forEach(sparkle => {
      ctx.save();
      ctx.globalAlpha = sparkle.life;
      ctx.fillStyle = '#FFD700';
      ctx.beginPath();
      ctx.arc(sparkle.x, sparkle.y, sparkle.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });
    
    // Draw coal
    ctx.fillStyle = '#2F2F2F';
    ctx.beginPath();
    ctx.arc(this.x + this.width/2, this.y + this.height/2, this.width/2, 0, Math.PI * 2);
    ctx.fill();
    
    // Add coal texture
    ctx.fillStyle = '#1C1C1C';
    ctx.beginPath();
    ctx.arc(this.x + this.width/2 - 5, this.y + this.height/2 - 3, 4, 0, Math.PI * 2);
    ctx.arc(this.x + this.width/2 + 3, this.y + this.height/2 + 4, 3, 0, Math.PI * 2);
    ctx.fill();
    
    // Draw glow effect
    ctx.save();
    ctx.globalAlpha = 0.3;
    ctx.fillStyle = '#FFD700';
    ctx.beginPath();
    ctx.arc(this.x + this.width/2, this.y + this.height/2, this.width/2 + 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}