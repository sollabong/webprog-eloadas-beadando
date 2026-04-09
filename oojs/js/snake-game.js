class SnakeGame {
  constructor() {
    this.score = 0;
    this.direction = { x: 20, y: 0 };
    this.snake = [
      new GridElement(100, 100, 'snake-head'),
      new GridElement(80, 100, 'snake-body'),
    ];
    this.food = new Food();
    this.superFood = null;

    window.addEventListener('keydown', (e) => this.changeDirection(e));
    this.gameInterval = setInterval(() => this.move(), 150);
  }

  changeDirection(e) {
    const keys = {
      ArrowUp: { x: 0, y: -20 },
      ArrowDown: { x: 0, y: 20 },
      ArrowLeft: { x: -20, y: 0 },
      ArrowRight: { x: 20, y: 0 },
    };
    if (keys[e.key]) {
      const newDir = keys[e.key];
      if (newDir.x !== -this.direction.x && newDir.y !== -this.direction.y) {
        this.direction = newDir;
      }
    }
  }

  move() {
    const head = this.snake[0];
    const nx = head.x + this.direction.x;
    const ny = head.y + this.direction.y;

    if (
      nx < 0 ||
      nx >= 400 ||
      ny < 0 ||
      ny >= 400 ||
      this.snake.some((p) => p.x === nx && p.y === ny)
    ) {
      this.gameOver();
      return;
    }

    const newHead = new GridElement(nx, ny, 'snake-head');
    this.snake.unshift(newHead);
    this.snake[1].element.className = 'dot snake-body';

    let ate = false;

    if (nx === this.food.x && ny === this.food.y) {
      this.score += 10;
      this.food.respawn();
      ate = true;
      this.trySpawnSuperFood();
    } else if (
      this.superFood &&
      nx === this.superFood.x &&
      ny === this.superFood.y
    ) {
      this.score += 50;
      this.grow(4);
      this.superFood.remove();
      this.superFood = null;
      ate = true;
    }

    if (!ate) {
      const tail = this.snake.pop();
      tail.remove();
    }

    document.getElementById('score').innerText = 'Pontszám: ' + this.score;
  }

  grow(count) {
    for (let i = 0; i < count; i++) {
      const last = this.snake[this.snake.length - 1];
      this.snake.push(new GridElement(last.x, last.y, 'snake-body'));
    }
  }

  trySpawnSuperFood() {
    if (!this.superFood && Math.random() < 0.2) {
      this.superFood = new SuperFood(() => {
        this.superFood = null;
      });
    }
  }

  gameOver() {
    clearInterval(this.gameInterval);
    alert('Játék vége! Pontszám: ' + this.score);
    location.reload();
  }
}
