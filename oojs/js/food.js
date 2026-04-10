class Food extends GridElement {
  constructor() {
    super(-100, -100, 'food');
    this.respawn();
  }

  respawn() {
    this.x = Math.floor(Math.random() * 20) * 20;
    this.y = Math.floor(Math.random() * 20) * 20;
    this.draw();
  }
}
