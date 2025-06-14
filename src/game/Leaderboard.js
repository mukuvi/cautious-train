export class Leaderboard {
  constructor(game) {
    this.game = game;
    this.trains = [];
    this.playerPosition = 1;
  }
  
  addTrain(train, isPlayer = false) {
    this.trains.push({
      train: train,
      isPlayer: isPlayer,
      position: 0,
      lastPosition: 0
    });
  }
  
  update() {
    // Update positions based on distance traveled
    this.trains.forEach(entry => {
      if (entry.isPlayer) {
        entry.position = this.game.score / 10;
      } else {
        entry.position = entry.train.position;
      }
    });
    
    // Sort by position (descending)
    this.trains.sort((a, b) => b.position - a.position);
    
    // Update player position
    const playerEntry = this.trains.find(entry => entry.isPlayer);
    if (playerEntry) {
      this.playerPosition = this.trains.indexOf(playerEntry) + 1;
    }
  }
  
  draw(ctx) {
    const x = this.game.width - 200;
    const y = 80;
    const width = 180;
    const height = Math.min(300, this.trains.length * 35 + 40);
    
    // Draw background
    ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
    ctx.fillRect(x, y, width, height);
    
    // Draw border
    ctx.strokeStyle = '#FFD700';
    ctx.lineWidth = 2;
    ctx.strokeRect(x, y, width, height);
    
    // Draw title
    ctx.fillStyle = '#FFD700';
    ctx.font = 'bold 16px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('RACE STANDINGS', x + width/2, y + 20);
    
    // Draw train positions
    ctx.font = '12px Arial';
    ctx.textAlign = 'left';
    
    this.trains.forEach((entry, index) => {
      const entryY = y + 40 + index * 25;
      
      if (entry.isPlayer) {
        ctx.fillStyle = '#00FF00';
        ctx.fillRect(x + 5, entryY - 15, width - 10, 20);
        ctx.fillStyle = '#000000';
      } else {
        ctx.fillStyle = '#FFFFFF';
      }
      
      const position = index + 1;
      const name = entry.isPlayer ? 'YOU' : entry.train.name;
      const distance = Math.floor(entry.position);
      
      ctx.fillText(`${position}. ${name}`, x + 10, entryY);
      ctx.fillText(`${distance}m`, x + width - 50, entryY);
    });
  }
  
  getPlayerPosition() {
    return this.playerPosition;
  }
  
  getTotalTrains() {
    return this.trains.length;
  }
}