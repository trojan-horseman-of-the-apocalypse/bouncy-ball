// initialise canvas and context
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

// physical variables
const g = 0.981; // gravity
const fac = 0.8; // velocity reduction factor per bounce
const radius = 20; // ball radius

const state = [];

function drawBall(ball, oldXPos, oldYPos) {
  context.clearRect(oldXPos - radius, oldYPos - radius, radius * 2, radius * 2); // clear ball arcs
  context.beginPath();
  context.arc(ball.x, ball.y, radius, 0, 2 * Math.PI, true); // draw ball
  context.closePath();
  context.fill();
}

function update(ball) {
  const xToRemove = ball.x;
  const yToRemove = ball.y;
  const newBall = ball
  // update velocity
  newBall.vy += g; // gravity

  // update position
  newBall.x += newBall.vx;
  newBall.y += newBall.vy;

  // bounce the ball off each wall
  if (newBall.x - radius / 2 < 0 && newBall.vx < 0) {
    newBall.vx = -newBall.vx;
  }
  if (newBall.x + radius / 2 > canvas.width && newBall.vx > 0) {
    newBall.vx = -newBall.vx;
  }
  if (newBall.y - radius / 2 < 0 && newBall.vy < 0) {
    newBall.vy = -newBall.vy;
  }

  // handle bouncing
  if (newBall.y > canvas.height - radius) {
    newBall.y = canvas.height - radius;
    // stop ball after x bounces
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
  // setup random velocities
  let vx = Math.floor(Math.random() * 10);
  let vy = Math.floor(Math.random() * 10);
  // setup random direction
  const randomDir = Math.floor(Math.random() * 2);
  if (randomDir === 0) {
    vx = -vx;
  }
  if (randomDir === 0) {
    vy = -vy;
  }
  // tracking state of latest ball
  state.push({
    x: e.offsetX,
    y: e.offsetY,
    vx,
    vy,
    remainingBounces: 50,
  });
  // if this is the first ball, kick off the updating of state
  if (state.length === 1) {
    setInterval(() => {
      for (let i = 0; i < state.length; i += 1) {
        update(state[i]);
      }
    }, 1000 / 60); // 60 frames per second
  }
});
