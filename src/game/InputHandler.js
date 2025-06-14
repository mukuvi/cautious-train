export class InputHandler {
  constructor(game) {
    this.game = game;
    this.keys = [];
    
    window.addEventListener('keydown', (e) => {
      if (!this.keys.includes(e.key)) {
        this.keys.push(e.key);
      }
      
      // Prevent default behavior for game keys
      if (['ArrowUp', 'ArrowDown', ' '].includes(e.key)) {
        e.preventDefault();
      }
    });
    
    window.addEventListener('keyup', (e) => {
      const index = this.keys.indexOf(e.key);
      if (index > -1) {
        this.keys.splice(index, 1);
      }
    });
  }
}