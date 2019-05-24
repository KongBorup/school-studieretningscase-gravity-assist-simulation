let points;
let curIndex = 0;

function setup() {
  createCanvas(800, 600);
  points = calculateTrajectory();  
}

function calculateTrajectory() {
  const positions = [];
  const earth = {
    pos: createVector(1, 0),
    vel: createVector(0, TWO_PI),
  };
  
  positions.push(earth.pos);

  for (let i = 0; i < numSteps; i++) {
    const { vel, pos } = earth;
    const { mult, add } = p5.Vector;

    // Calculate acceleration using Newton's law of gravitation
    const unitVector = pos.copy();
    unitVector.normalize();
    const acc = mult(unitVector, -G * SUN_MASS * EARTH_MASS / pos.mag() ** 2);
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
  stroke(34, 139, 34);

  noFill();
  beginShape();
  for (let i = 0; i <= curIndex; i += animSpeed) {
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
  
  scale(0.01);
  textSize(12);

  textAlign(CENTER, CENTER);
  fill(218, 165, 32);
  text('Sun', 0, 40);
  
  textAlign(CENTER, LEFT);
  fill(34, 139, 34);
  text('Earth', x * 100 + 25, y * 100);

  curIndex += animSpeed;

  if (curIndex >= points.length) {
    console.log('FINISHED ANIMATING');
    noLoop();
  }
}