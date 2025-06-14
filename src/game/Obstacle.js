export class Obstacle {
  constructor(game) {
    this.game = game;
    this.width = 40 + Math.random() * 60;
    this.height = 60 + Math.random() * 40;
    this.x = game.width;
    this.y = game.height - this.height - 100;
    this.speed = game.gameSpeed + Math.random() * 2;
    this.markedForDeletion = false;
    this.type = Math.random() < 0.5 ? 'rock' : 'tree';
  }
  
  update(deltaTime) {
    this.x -= this.speed;
    
    if (this.x + this.width < 0) {
      this.markedForDeletion = true;
    }
  }
  
  draw(ctx) {
    if (this.type === 'rock') {
      // Draw rock
      ctx.fillStyle = '#696969';
      ctx.beginPath();
      ctx.ellipse(this.x + this.width/2, this.y + this.height/2, this.width/2, this.height/2, 0, 0, Math.PI * 2);
      ctx.fill();
      
      // Add some texture
      ctx.fillStyle = '#808080';
      ctx.beginPath();
      ctx.ellipse(this.x + this.width/3, this.y + this.height/3, this.width/6, this.height/6, 0, 0, Math.PI * 2);
      ctx.fill();
    } else {
      // Draw tree trunk
      ctx.fillStyle = '#8B4513';
      ctx.fillRect(this.x + this.width/2 - 8, this.y + this.height/2, 16, this.height/2);
      
      // Draw tree foliage
      ctx.fillStyle = '#228B22';
      ctx.beginPath();
      ctx.arc(this.x + this.width/2, this.y + this.height/3, this.width/2, 0, Math.PI * 2);
      ctx.fill();
      
      // Add some leaves detail
      ctx.fillStyle = '#32CD32';
      ctx.beginPath();
      ctx.arc(this.x + this.width/2 - 10, this.y + this.height/3 - 5, this.width/4, 0, Math.PI * 2);
      ctx.fill();
    }
    
    // Draw warning shadow
    ctx.fillStyle = 'rgba(255, 0, 0, 0.2)';
    ctx.fillRect(this.x - 10, this.y + this.height, this.width + 20, 10);
  }
}