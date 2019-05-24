// Unit rescaling factors
// const yearFactor = 1 / (365.25 * 24 * 60 * 60)
// const auFactor = 1 / (1.49 * 10^11)

// Constants
// const G = 6.67e-11;
// const M = 2e30;
const GM = 40;
const dt = 0.001;
const numSteps = 5 / dt;
const animSpeed = 10;

let points;
let curIndex = 0;

function setup() {
  createCanvas(800, 600);
  points = calculateTrajectory();  
}

function calculateTrajectory() {
  const positions = [];
  const earth = {
    pos: createVector(4, 1.5),
    vel: createVector(-TWO_PI, 0),
  };
  
  positions.push(earth.pos);

  for (let i = 0; i < numSteps; i++) {
    const { vel, pos } = earth;
    const { mult, add } = p5.Vector;

    // Calculate acceleration using Newton's law of gravitation
    const acc = mult(pos, -GM / pos.mag() ** 3);
    // Update velocity and position using Euler's method
    earth.vel = add(vel, mult(acc, dt));
    earth.pos = add(pos, mult(vel, dt));
    
    positions.push(earth.pos);
  }

  return positions;
}

function draw() {
  background(0);
  translate(width / 2, height / 2);
  scale(100);
  strokeWeight(0.01);
  stroke(34, 139, 34, 60);

  noFill();
  beginShape(LINES);
  for (let i = 0; i <= curIndex; i++) {
    const { x, y } = points[i];
    vertex(x, y);
  }
  endShape();
  noStroke();
  
  fill(218, 165, 32);
  circle(0, 0, 0.5);
  
  const { x, y } = points[curIndex];
  fill(34, 139, 34);
  circle(x, y, 0.1);
  
  curIndex += animSpeed;

  if (curIndex >= points.length) {
    console.log('FINISHED ANIMATING');
    noLoop();
  }
}