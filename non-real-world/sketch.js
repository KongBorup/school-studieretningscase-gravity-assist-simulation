let bodies = [];
let curIndex = 0;

function setup() {
  createCanvas(800, 600);
  calculateTrajectories();
}

function calculateTrajectories() {
  bodies = [
    new CelestialBody({
      pos: createVector(2, 0),
      vel: createVector(0, 2 * PI),
      mass: 100,
      colour: [34, 139, 34],
    }),
    new CelestialBody({
      pos: createVector(3.5, 1.7),
      vel: createVector(-0.3 * PI, 0),
      mass: 0.5,
      colour: [255],
    }),
    new CelestialBody({
      pos: createVector(-1, 0),
      vel: createVector(0, -TWO_PI),
      mass: 1,
      colour: [205, 133, 63],
    }),
    new CelestialBody({
      pos: createVector(0, 0),
      vel: createVector(0, 0),
      mass: 10000,
      colour: [218, 165, 32],
    }),
  ];

  for (let i = 0; i < numSteps; i++) {
    // bodies[0].update([bodies[1], bodies[2], bodies[3]]);
    // bodies[3].history.push(bodies[3].pos);
    // bodies[2].update([bodies[3], bodies[0], bodies[1]]);
    // bodies[1].update([bodies[2], bodies[3], bodies[0]]);
    bodies
      .filter((_, i) => i !== 3)
      .forEach(body => body.update(bodies.filter(other => body !== other)));

    bodies[3].history.push(bodies[3].pos);
  }
}

function draw() {
  background(0);
  translate(width / 2, height / 2);
  scale(100);
  strokeWeight(0.01);

  bodies.forEach((body) => {
    noFill();
    stroke(...body.colour);
    beginShape(LINES);
    for (let i = 0; i <= curIndex; i += animSpeed) {
      const { x, y } = body.history[i];
      vertex(x, y);
    }
    endShape();
    fill(...body.colour);
    const { x, y } = body.history[curIndex];
    const r = map(body.mass, 0, 333000, 0.2, 0.5);
    circle(x, y, r);
  });
  
  // stroke(205, 133, 63);
  
  // Sun
  // fill(218, 165, 32);
  // circle(0, 0, 0.5);
  
  // const earthX = earthPoints[curIndex].x;
  // const earthY = earthPoints[curIndex].y;
  // const rocketX = rocketPoints[curIndex].x;
  // const rocketY = rocketPoints[curIndex].y;
  // const jupiterX = jupiterPoints[curIndex].x;
  // const jupiterY = jupiterPoints[curIndex].y;
  
  // fill(205, 133, 63);
  // circle(jupiterX, jupiterY, 0.3);
  // fill(34, 139, 34);
  // circle(earthX, earthY, 0.1);
  // fill(255);
  // circle(rocketX, rocketY, 0.05);
  
  // scale(0.01);
  // textSize(12);
  // textAlign(CENTER, CENTER);
  // fill(218, 165, 32);
  // text('Sun', 0, 40);
  // fill(34, 139, 34);
  // text('Earth', earthX * 100 + 25, earthY * 100);
  // fill(255);
  // text('Rocket', rocketX * 100 + 25, rocketY * 100);

  curIndex += animSpeed;

  if (curIndex >= numSteps) {
    console.log('FINISHED ANIMATING');
    noLoop();
  }
}