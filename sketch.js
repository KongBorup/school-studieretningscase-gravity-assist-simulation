let earthPoints;
let rocketPoints;
let curIndex = 0;

function setup() {
  createCanvas(800, 600);
  const { earth, rocket } = calculateTrajectory();  
  earthPoints = earth;  
  rocketPoints = rocket;
}

function calculateTrajectory() {
  const earthPositions = [];
  const earth = new CelestialBody({
    pos: createVector(1, 0),
    vel: createVector(0, TWO_PI),
    mass: EARTH_MASS,
  });
  const rocketPositions = [];
  const rocket = new CelestialBody({
    pos: createVector(1.001, -0.1),
    vel: createVector(0, 0),
    mass: SPACE_SHUTTLE_MASS,
  });
  const sun = new CelestialBody({
    pos: createVector(0, 0),
    vel: createVector(0, 0),
    mass: SUN_MASS,
  });
  
  earthPositions.push(earth.pos);
  rocketPositions.push(rocket.pos);

  for (let i = 0; i < numSteps; i++) {
    earth.update([sun, rocket]);
    rocket.update([sun, earth]);

    // const { mult, add } = p5.Vector;

    // // Calculate acceleration using Newton's law of gravitation
    // const earthUnitVector = earth.pos.copy();
    // earthUnitVector.normalize();
    // const earthAcc = mult(earthUnitVector, -G * SUN_MASS * EARTH_MASS / earth.pos.mag() ** 2);

    // const rocketUnitVector = rocket.pos.copy();
    // rocketUnitVector.normalize();
    // let rocketAcc = mult(rocketUnitVector, -G * SUN_MASS * SPACE_SHUTTLE_MASS / rocket.pos.mag() ** 2);

    // const earthRocketAcc = mult(rocketUnitVector, -G * EARTH_MASS * SPACE_SHUTTLE_MASS / rocket.pos.dist(earth.pos) ** 2);

    // rocketAcc = add(rocketAcc, earthRocketAcc);
    // // Update velocity and position using Euler's method
    // earth.pos = add(earth.pos, mult(earth.vel, dt));
    // earth.vel = add(earth.vel, mult(earthAcc, dt));

    // // Update velocity and position using Euler's method
    // rocket.pos = add(rocket.pos, mult(rocket.vel, dt));
    // rocket.vel = add(rocket.vel, mult(rocketAcc, dt));
    
    earthPositions.push(earth.pos);
    rocketPositions.push(rocket.pos);
  }

  return {
    earth: earthPositions,
    rocket: rocketPositions,
  };
}

function draw() {
  background(0);
  translate(width / 2, height / 2);
  scale(100);
  strokeWeight(0.01);

  stroke(34, 139, 34);
  noFill();
  beginShape(LINES);
  for (let i = 0; i <= curIndex; i += animSpeed) {
    const { x, y } = earthPoints[i];
    vertex(x, y);
  }
  endShape();
  
  stroke(255);
  beginShape(LINES);
  for (let i = 0; i <= curIndex; i += animSpeed) {
    const { x, y } = rocketPoints[i];
    vertex(x, y);
  }
  endShape();
  noStroke();
  
  fill(218, 165, 32);
  circle(0, 0, 0.5);
  
  const earthX = earthPoints[curIndex].x;
  const earthY = earthPoints[curIndex].y;
  const rocketX = rocketPoints[curIndex].x;
  const rocketY = rocketPoints[curIndex].y;
  
  fill(34, 139, 34);
  circle(earthX, earthY, 0.1);
  fill(255);
  circle(rocketX, rocketY, 0.05);
  
  scale(0.01);
  textSize(12);
  textAlign(CENTER, CENTER);
  fill(218, 165, 32);
  text('Sun', 0, 40);
  fill(34, 139, 34);
  text('Earth', earthX * 100 + 25, earthY * 100);
  fill(255);
  text('Rocket', rocketX * 100 + 25, rocketY * 100);

  curIndex += animSpeed;

  if (curIndex >= earthPoints.length) {
    console.log('FINISHED ANIMATING');
    noLoop();

    console.log(rocketPoints[0], rocketPoints[rocketPoints.length - 1]);
  }
}