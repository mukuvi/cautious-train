export class Background {
  constructor(game) {
    this.game = game;
    this.width = game.width;
    this.height = game.height;
    this.clouds = [];
    this.mountains = [];
    this.trees = [];
    this.birds = [];
    this.stars = [];
    this.trackOffset = 0;
    this.timeOfDay = 'day'; // day, sunset, night
    this.timeProgress = 0;
    
    this.initializeClouds();
    this.initializeMountains();
    this.initializeTrees();
    this.initializeBirds();
    this.initializeStars();
  }
  
  initializeClouds() {
    for (let i = 0; i < 8; i++) {
      this.clouds.push({
        x: Math.random() * this.width * 3,
        y: 30 + Math.random() * 120,
        width: 60 + Math.random() * 80,
        height: 30 + Math.random() * 40,
        speed: 0.1 + Math.random() * 0.4,
        opacity: 0.6 + Math.random() * 0.4
      });
    }
  }
  
  initializeMountains() {
    for (let i = 0; i < 12; i++) {
      this.mountains.push({
        x: i * 150 - 200,
        y: 180 + Math.random() * 120,
        width: 120 + Math.random() * 120,
        height: 180 + Math.random() * 180,
        speed: 0.3 + Math.random() * 0.2,
        layer: Math.floor(Math.random() * 3)
      });
    }
  }
  
  initializeTrees() {
    for (let i = 0; i < 25; i++) {
      this.trees.push({
        x: Math.random() * this.width * 4,
        y: this.height - 140 - Math.random() * 60,
        width: 15 + Math.random() * 25,
        height: 50 + Math.random() * 50,
        speed: 0.8 + Math.random() * 0.7,
        type: Math.random() < 0.7 ? 'pine' : 'oak'
      });
    }
  }
  
  initializeBirds() {
    for (let i = 0; i < 5; i++) {
      this.birds.push({
        x: Math.random() * this.width * 2,
        y: 50 + Math.random() * 100,
        vx: 0.5 + Math.random() * 1,
        vy: (Math.random() - 0.5) * 0.5,
        wingPhase: Math.random() * Math.PI * 2
      });
    }
  }
  
  initializeStars() {
    for (let i = 0; i < 100; i++) {
      this.stars.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height * 0.6,
        brightness: Math.random(),
        twinklePhase: Math.random() * Math.PI * 2
      });
    }
  }
  
  update(deltaTime) {
    // Update time of day
    this.timeProgress += deltaTime * 0.0001;
    if (this.timeProgress > 1) {
      this.timeProgress = 0;
      const times = ['day', 'sunset', 'night'];
      const currentIndex = times.indexOf(this.timeOfDay);
      this.timeOfDay = times[(currentIndex + 1) % times.length];
    }
    
    // Update clouds
    this.clouds.forEach(cloud => {
      cloud.x -= cloud.speed;
      if (cloud.x + cloud.width < 0) {
        cloud.x = this.width + Math.random() * 300;
      }
    });
    
    // Update mountains
    this.mountains.forEach(mountain => {
      mountain.x -= mountain.speed * (mountain.layer + 1) * 0.3;
      if (mountain.x + mountain.width < 0) {
        mountain.x = this.width + Math.random() * 200;
      }
    });
    
    // Update trees
    this.trees.forEach(tree => {
      tree.x -= tree.speed * this.game.gameSpeed;
      if (tree.x + tree.width < 0) {
        tree.x = this.width + Math.random() * 150;
      }
    });
    
    // Update birds
    this.birds.forEach(bird => {
      bird.x -= bird.vx;
      bird.y += bird.vy;
      bird.wingPhase += 0.2;
      
      if (bird.x < -50) {
        bird.x = this.width + 50;
        bird.y = 50 + Math.random() * 100;
      }
      
      if (bird.y < 20 || bird.y > 150) {
        bird.vy *= -1;
      }
    });
    
    // Update track
    this.trackOffset -= this.game.gameSpeed;
    if (this.trackOffset <= -40) {
      this.trackOffset = 0;
    }
  }
  
  draw(ctx) {
    // Draw sky based on time of day
    this.drawSky(ctx);
    
    // Draw stars (only at night)
    if (this.timeOfDay === 'night') {
      this.drawStars(ctx);
    }
    
    // Draw mountains (multiple layers)
    this.drawMountains(ctx);
    
    // Draw clouds
    this.drawClouds(ctx);
    
    // Draw birds
    this.drawBirds(ctx);
    
    // Draw distant trees
    this.drawTrees(ctx);
    
    // Draw ground
    this.drawGround(ctx);
    
    // Draw railroad tracks
    this.drawTracks(ctx);
  }
  
  drawSky(ctx) {
    let gradient;
    
    switch (this.timeOfDay) {
      case 'day':
        gradient = ctx.createLinearGradient(0, 0, 0, this.height);
        gradient.addColorStop(0, '#87CEEB');
        gradient.addColorStop(0.7, '#98FB98');
        gradient.addColorStop(1, '#90EE90');
        break;
      case 'sunset':
        gradient = ctx.createLinearGradient(0, 0, 0, this.height);
        gradient.addColorStop(0, '#FF6B35');
        gradient.addColorStop(0.3, '#F7931E');
        gradient.addColorStop(0.7, '#FFD23F');
        gradient.addColorStop(1, '#FFA500');
        break;
      case 'night':
        gradient = ctx.createLinearGradient(0, 0, 0, this.height);
        gradient.addColorStop(0, '#191970');
        gradient.addColorStop(0.7, '#2F2F4F');
        gradient.addColorStop(1, '#483D8B');
        break;
    }
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, this.width, this.height);
  }
  
  drawStars(ctx) {
    this.stars.forEach(star => {
      ctx.save();
      const twinkle = Math.sin(Date.now() * 0.005 + star.twinklePhase) * 0.3 + 0.7;
      ctx.globalAlpha = star.brightness * twinkle;
      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.arc(star.x, star.y, 1, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });
  }
  
  drawMountains(ctx) {
    this.mountains.forEach(mountain => {
      const layerAlpha = 1 - (mountain.layer * 0.3);
      ctx.save();
      ctx.globalAlpha = layerAlpha;
      
      let mountainColor = '#8B7355';
      if (this.timeOfDay === 'sunset') mountainColor = '#CD853F';
      if (this.timeOfDay === 'night') mountainColor = '#2F4F4F';
      
      ctx.fillStyle = mountainColor;
      ctx.beginPath();
      ctx.moveTo(mountain.x, this.height);
      ctx.lineTo(mountain.x + mountain.width * 0.3, mountain.y + mountain.height * 0.2);
      ctx.lineTo(mountain.x + mountain.width * 0.5, mountain.y);
      ctx.lineTo(mountain.x + mountain.width * 0.7, mountain.y + mountain.height * 0.3);
      ctx.lineTo(mountain.x + mountain.width, this.height);
      ctx.closePath();
      ctx.fill();
      
      // Snow caps
      if (mountain.layer === 0) {
        ctx.fillStyle = this.timeOfDay === 'night' ? '#E6E6FA' : '#FFFFFF';
        ctx.beginPath();
        ctx.moveTo(mountain.x + mountain.width * 0.4, mountain.y + mountain.height * 0.1);
        ctx.lineTo(mountain.x + mountain.width * 0.5, mountain.y);
        ctx.lineTo(mountain.x + mountain.width * 0.6, mountain.y + mountain.height * 0.1);
        ctx.closePath();
        ctx.fill();
      }
      
      ctx.restore();
    });
  }
  
  drawClouds(ctx) {
    this.clouds.forEach(cloud => {
      ctx.save();
      ctx.globalAlpha = cloud.opacity;
      
      let cloudColor = 'rgba(255, 255, 255, 0.9)';
      if (this.timeOfDay === 'sunset') cloudColor = 'rgba(255, 200, 150, 0.8)';
      if (this.timeOfDay === 'night') cloudColor = 'rgba(200, 200, 220, 0.6)';
      
      ctx.fillStyle = cloudColor;
      
      // Draw fluffy cloud shape
      ctx.beginPath();
      ctx.arc(cloud.x, cloud.y, cloud.width * 0.3, 0, Math.PI * 2);
      ctx.arc(cloud.x + cloud.width * 0.3, cloud.y - cloud.height * 0.1, cloud.width * 0.25, 0, Math.PI * 2);
      ctx.arc(cloud.x + cloud.width * 0.6, cloud.y, cloud.width * 0.35, 0, Math.PI * 2);
      ctx.arc(cloud.x + cloud.width * 0.8, cloud.y + cloud.height * 0.1, cloud.width * 0.2, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.restore();
    });
  }
  
  drawBirds(ctx) {
    this.birds.forEach(bird => {
      ctx.strokeStyle = this.timeOfDay === 'night' ? '#FFFFFF' : '#000000';
      ctx.lineWidth = 2;
      
      const wingOffset = Math.sin(bird.wingPhase) * 5;
      
      ctx.beginPath();
      ctx.moveTo(bird.x - 8, bird.y + wingOffset);
      ctx.lineTo(bird.x, bird.y);
      ctx.lineTo(bird.x + 8, bird.y + wingOffset);
      ctx.stroke();
    });
  }
  
  drawTrees(ctx) {
    this.trees.forEach(tree => {
      if (tree.type === 'pine') {
        // Pine tree
        ctx.fillStyle = this.timeOfDay === 'night' ? '#1F4F1F' : '#8B4513';
        ctx.fillRect(tree.x + tree.width/2 - 3, tree.y + tree.height/2, 6, tree.height/2);
        
        ctx.fillStyle = this.timeOfDay === 'night' ? '#0F2F0F' : '#228B22';
        for (let i = 0; i < 3; i++) {
          ctx.beginPath();
          ctx.moveTo(tree.x + tree.width/2, tree.y + i * tree.height/4);
          ctx.lineTo(tree.x, tree.y + tree.height/3 + i * tree.height/4);
          ctx.lineTo(tree.x + tree.width, tree.y + tree.height/3 + i * tree.height/4);
          ctx.closePath();
          ctx.fill();
        }
      } else {
        // Oak tree
        ctx.fillStyle = this.timeOfDay === 'night' ? '#1F4F1F' : '#8B4513';
        ctx.fillRect(tree.x + tree.width/2 - 4, tree.y + tree.height/2, 8, tree.height/2);
        
        ctx.fillStyle = this.timeOfDay === 'night' ? '#0F2F0F' : '#228B22';
        ctx.beginPath();
        ctx.arc(tree.x + tree.width/2, tree.y + tree.height/3, tree.width/2, 0, Math.PI * 2);
        ctx.fill();
      }
    });
  }
  
  drawGround(ctx) {
    let groundColor = '#8FBC8F';
    if (this.timeOfDay === 'sunset') groundColor = '#9ACD32';
    if (this.timeOfDay === 'night') groundColor = '#2F4F2F';
    
    ctx.fillStyle = groundColor;
    ctx.fillRect(0, this.height - 100, this.width, 100);
    
    // Add grass texture
    ctx.fillStyle = this.timeOfDay === 'night' ? '#1F3F1F' : '#7CFC00';
    for (let x = 0; x < this.width; x += 20) {
      for (let i = 0; i < 5; i++) {
        const grassX = x + Math.random() * 20;
        const grassY = this.height - 100 + Math.random() * 20;
        ctx.fillRect(grassX, grassY, 2, 8);
      }
    }
  }
  
  drawTracks(ctx) {
    const trackY = this.height - 90;
    
    // Rails
    ctx.fillStyle = this.timeOfDay === 'night' ? '#4F4F4F' : '#708090';
    ctx.fillRect(0, trackY, this.width, 4);
    ctx.fillRect(0, trackY + 20, this.width, 4);
    ctx.fillRect(0, trackY + 40, this.width, 4);
    ctx.fillRect(0, trackY + 60, this.width, 4);
    
    // Railroad ties
    ctx.fillStyle = this.timeOfDay === 'night' ? '#2F1F1F' : '#8B4513';
    for (let x = this.trackOffset; x < this.width + 40; x += 40) {
      ctx.fillRect(x, trackY - 5, 30, 70);
    }
    
    // Add rail shine
    if (this.timeOfDay !== 'night') {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.fillRect(0, trackY, this.width, 1);
      ctx.fillRect(0, trackY + 20, this.width, 1);
      ctx.fillRect(0, trackY + 40, this.width, 1);
      ctx.fillRect(0, trackY + 60, this.width, 1);
    }
  }
}