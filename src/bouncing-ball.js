const gravity = 0.981;
const floorFriction = -0.8;
const wallFriction = -0.4;
const balls = [];
const radius = 40;
const randomDir = Math.floor(Math.random() * 2);

function setup() {
  createCanvas(window.windowWidth, window.windowHeight);
  noStroke();
  fill(0);
}

class Ball {
  constructor(x, y, dia) {
    this.x = x;
    this.y = y;
    this.vx = randomDir === 0 ? -Math.floor(Math.random() * 10) : Math.floor(Math.random() * 10);
    this.vy = randomDir === 0 ? -Math.floor(Math.random() * 10) : Math.floor(Math.random() * 10);
    this.diameter = dia;
  }

  move() {
    this.vy += gravity;
    this.x += this.vx;
    this.y += this.vy;

    if (this.x + this.diameter / 2 > width) {
      this.x = width - this.diameter / 2;
      this.vx *= wallFriction;
    } else if (this.x - this.diameter / 2 < 0) {
      this.x = this.diameter / 2;
      this.vx *= wallFriction;
    }
    if (this.y + this.diameter / 2 > height) {
      this.y = height - this.diameter / 2;
      this.vy *= floorFriction;
    } else if (this.y - this.diameter / 2 < 0) {
      this.y = this.diameter / 2;
      this.vy *= floorFriction;
    }
    if (this.y + this.diameter / 2 === height && this.vy > -0.6) {
      this.vy = 0;
      this.vx = 0;
    }
  }

  display() {
    ellipse(this.x, this.y, this.diameter, this.diameter);
  }
}

document.querySelector('body').addEventListener('click', (e) => {
  balls.push(new Ball(
    e.offsetX,
    e.offsetY,
    radius,
  ));
});

function draw() {
  if (balls.length > 0) {
    background(255);
    balls.forEach((ball) => {
      ball.move();
      ball.display();
    });
  }
}
