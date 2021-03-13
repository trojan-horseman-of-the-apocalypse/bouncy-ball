// initialise canvas and context
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

// physical variables
const g = 0.981; // gravity
const fac = 0.8; // velocity reduction factor per bounce
const radius = 20; // ball radius

// initialise position and velocity of ball

const state = [];

function drawBall(ball, oldXPos, oldYPos) {
  // with (context){
  context.clearRect(oldXPos - radius, oldYPos - radius, radius * 2, radius * 2); // clear canvas
  context.beginPath();
  context.arc(ball.x, ball.y, radius, 0, 2 * Math.PI, true);
  context.closePath();
  context.fill();
  // };
}

function update(ball) {
  const xToRemove = ball.x;
  const yToRemove = ball.y;
  const newBall = ball;
  // update velocity
  newBall.vy += g; // gravity

  // update position
  newBall.x += newBall.vx;
  newBall.y += newBall.vy;
  // handle bouncing
  if (newBall.y > canvas.height - radius) {
    newBall.y = canvas.height - radius;
    if (newBall.remainingBounces > 0) {
      newBall.vy *= -fac;
      newBall.remainingBounces -= 1;
    } else {
      newBall.vy = 0;
      newBall.vx = 0;
    }
  }
  // update the newBall
  drawBall(newBall, xToRemove, yToRemove);
}

// ensure that code does not run before page has loaded
window.onload = document.getElementById('canvas').addEventListener('click', (e) => {
  let vx = Math.floor(Math.random() * 15);
  let vy = Math.floor(Math.random() * 15);
  const randomDir = Math.floor(Math.random() * 2);
  if (randomDir === 0) {
    vx = -vx;
  }
  if (randomDir === 0) {
    vy = -vy;
  }
  state.push({
    x: e.offsetX,
    y: e.offsetY,
    vx,
    vy,
    remainingBounces: 30,
  });
  if (state.length === 1) {
    setInterval(() => {
      for (let i = 0; i < state.length; i += 1) {
        update(state[i]);
      }
    }, 1000 / 60); // 60 frames per second
  }
});
