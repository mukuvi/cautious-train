export class Background {
  constructor(game) {
    this.game = game;
    this.width = game.width;
    this.height = game.height;
    this.clouds = [];
    this.mountains = [];
    this.trees = [];
    this.trackOffset = 0;
    
    this.initializeClouds();
    this.initializeMountains();
    this.initializeTrees();
  }
  
  initializeClouds() {
    for (let i = 0; i < 5; i++) {
      this.clouds.push({
        x: Math.random() * this.width * 2,
        y: 50 + Math.random() * 100,
        width: 80 + Math.random() * 60,
        height: 40 + Math.random() * 30,
        speed: 0.2 + Math.random() * 0.3
      });
    }
  }
  
  initializeMountains() {
    for (let i = 0; i < 8; i++) {
      this.mountains.push({
        x: i * 200 - 100,
        y: 200 + Math.random() * 100,
        width: 150 + Math.random() * 100,
        height: 200 + Math.random() * 150,
        speed: 0.5
      });
    }
  }
  
  initializeTrees() {
    for (let i = 0; i < 15; i++) {
      this.trees.push({
        x: Math.random() * this.width * 3,
        y: this.height - 150 - Math.random() * 50,
        width: 20 + Math.random() * 20,
        height: 60 + Math.random() * 40,
        speed: 1 + Math.random() * 0.5
      });
    }
  }
  
  update(deltaTime) {
    // Update clouds
    this.clouds.forEach(cloud => {
      cloud.x -= cloud.speed;
      if (cloud.x + cloud.width < 0) {
        cloud.x = this.width + Math.random() * 200;
      }
    });
    
    // Update mountains
    this.mountains.forEach(mountain => {
      mountain.x -= mountain.speed;
      if (mountain.x + mountain.width < 0) {
        mountain.x = this.width + Math.random() * 100;
      }
    });
    
    // Update trees
    this.trees.forEach(tree => {
      tree.x -= tree.speed * this.game.gameSpeed;
      if (tree.x + tree.width < 0) {
        tree.x = this.width + Math.random() * 100;
      }
    });
    
    // Update track
    this.trackOffset -= this.game.gameSpeed;
    if (this.trackOffset <= -40) {
      this.trackOffset = 0;
    }
  }
  
  draw(ctx) {
    // Draw sky gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, this.height);
    gradient.addColorStop(0, '#87CEEB');
    gradient.addColorStop(0.7, '#98FB98');
    gradient.addColorStop(1, '#90EE90');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, this.width, this.height);
    
    // Draw mountains
    this.mountains.forEach(mountain => {
      ctx.fillStyle = '#8B7355';
      ctx.beginPath();
      ctx.moveTo(mountain.x, this.height);
      ctx.lineTo(mountain.x + mountain.width/2, mountain.y);
      ctx.lineTo(mountain.x + mountain.width, this.height);
      ctx.closePath();
      ctx.fill();
      
      // Add snow caps
      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.moveTo(mountain.x + mountain.width/2 - 20, mountain.y + 20);
      ctx.lineTo(mountain.x + mountain.width/2, mountain.y);
      ctx.lineTo(mountain.x + mountain.width/2 + 20, mountain.y + 20);
      ctx.closePath();
      ctx.fill();
    });
    
    // Draw distant trees
    this.trees.forEach(tree => {
      ctx.fillStyle = '#8B4513';
      ctx.fillRect(tree.x + tree.width/2 - 3, tree.y + tree.height/2, 6, tree.height/2);
      
      ctx.fillStyle = '#228B22';
      ctx.beginPath();
      ctx.arc(tree.x + tree.width/2, tree.y + tree.height/3, tree.width/2, 0, Math.PI * 2);
      ctx.fill();
    });
    
    // Draw clouds
    this.clouds.forEach(cloud => {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.beginPath();
      ctx.arc(cloud.x, cloud.y, cloud.width/3, 0, Math.PI * 2);
      ctx.arc(cloud.x + cloud.width/3, cloud.y, cloud.width/4, 0, Math.PI * 2);
      ctx.arc(cloud.x + cloud.width/2, cloud.y, cloud.width/3, 0, Math.PI * 2);
      ctx.fill();
    });
    
    // Draw ground
    ctx.fillStyle = '#8FBC8F';
    ctx.fillRect(0, this.height - 100, this.width, 100);
    
    // Draw railroad tracks
    const trackY = this.height - 90;
    
    // Rails
    ctx.fillStyle = '#708090';
    ctx.fillRect(0, trackY, this.width, 4);
    ctx.fillRect(0, trackY + 20, this.width, 4);
    
    // Railroad ties
    ctx.fillStyle = '#8B4513';
    for (let x = this.trackOffset; x < this.width + 40; x += 40) {
      ctx.fillRect(x, trackY - 5, 30, 30);
    }
  }
}