class GridElement {
  constructor(x, y, className) {
    this.x = x;
    this.y = y;
    this.element = document.createElement('div');
    this.element.className = 'dot ' + className;
    document.getElementById('game-board').appendChild(this.element);
    this.draw();
  }

  draw() {
    this.element.style.left = this.x + 'px';
    this.element.style.top = this.y + 'px';
  }

  remove() {
    this.element.remove();
  }
}
